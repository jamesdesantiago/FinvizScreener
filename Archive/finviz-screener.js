const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Navigate to Finviz
    await page.goto('https://finviz.com', { waitUntil: 'networkidle2' });

    // Click the "Agree" button if present
    const privacyButtonSelector = '#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay.qc-cmp2-footer-scrolled > div > button.css-47sehv';
    try {
      await page.waitForSelector(privacyButtonSelector, { timeout: 5000 });
      await page.click(privacyButtonSelector);
      console.log('Clicked on "Agree" for the privacy banner.');
    } catch (err) {
      console.log('Privacy banner did not appear or has a different selector.');
    }

    // Navigate to the login page
    await page.goto('https://finviz.com/login.ashx', { waitUntil: 'networkidle2' });

    // Input credentials and log in
    const emailSelector = 'input[name=email]';
    const passwordSelector = 'input[name=password]';
    const loginButtonSelector = 'body > div.content > div > div > form > input';

    await page.waitForSelector(emailSelector, { timeout: 5000 });
    await page.type(emailSelector, process.env.FINVIZ_EMAIL, { delay: 50 });

    await page.waitForSelector(passwordSelector, { timeout: 5000 });
    await page.type(passwordSelector, process.env.FINVIZ_PASSWORD, { delay: 50 });

    await Promise.all([
      page.click(loginButtonSelector),
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ]);
    console.log('Logged in successfully!');

    // Navigate to the specified screener page
    const screenerURL = 'https://finviz.com/screener.ashx?v=111&f=idx_sp500,ind_stocksonly,sh_avgvol_o300,sh_curvol_o300,sh_price_o10&ft=4&o=-change';
    await page.goto(screenerURL, { waitUntil: 'networkidle2' });
    console.log('Navigated to the specified screener.');

    let combinedData = []; // To store all table data across pages
    let hasNextPage = true;

    while (hasNextPage) {
      // Extract table data on the current page
      const tableSelector = '#screener-table > td > table > tbody > tr > td > table';
      const tableData = await page.evaluate((selector) => {
        const table = document.querySelector(selector);
        if (!table) return [];
        const rows = table.querySelectorAll('tr');
        return Array.from(rows).map(row => {
          const cells = row.querySelectorAll('td');
          return Array.from(cells).map(cell => cell.innerText.trim());
        });
      }, tableSelector);

      combinedData = combinedData.concat(tableData);

      // Check for the "Next" button and click if available
      const nextPageSelector = '#screener_pagination > a.screener-pages.is-next';

      try {
        // Scroll to the "Next" button to ensure visibility
        await page.evaluate((selector) => {
          const element = document.querySelector(selector);
          if (element) element.scrollIntoView();
        }, nextPageSelector);

        // Wait for the button to be visible
        await page.waitForSelector(nextPageSelector, { timeout: 3000, visible: true });

        // Click the button
        await page.click(nextPageSelector);
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        console.log('Navigated to the next page.');
      } catch (err) {
        console.log('No more pages to navigate or "Next" button not clickable.');
        hasNextPage = false;
      }
    }

    console.log('Combined table data from all pages:', combinedData);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
})();
