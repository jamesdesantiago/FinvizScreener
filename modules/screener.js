const { captureScreenshot } = require('./screenshotHelper');
const { sanitizeFilename, retryOperation, getRandomDelay } = require('./utils'); // Import utility functions
const { logger } = require('./logger'); // Import logger

/**
 * Scrapes data from a given Finviz screener URL.
 * @param {puppeteer.Page} page - The Puppeteer page instance.
 * @param {string} screenerURL - The URL of the screener to scrape.
 * @param {string} screenerName - The name of the screener (for logging and screenshots).
 * @returns {Object} - An object containing headers and rows of scraped data.
 */
async function scrapeScreenerData(page, screenerURL, screenerName) {
  logger.info(`Starting scrape for URL: ${screenerURL}`);
  
  try {
    // Navigate to the screener URL with retry
    await retryOperation(() => page.goto(screenerURL, { waitUntil: 'domcontentloaded', timeout: 60000 }), 3, 2000);
    logger.info(`Navigated to ${screenerURL}`);
    
    // Introduce a random delay after navigation
    await new Promise(resolve => setTimeout(resolve, getRandomDelay()));

    // Define selectors
    const tableSelector = '#screener-table > td > table > tbody > tr > td > table';
    const noResultsSelector = '#js-screener-body-empty > tbody > tr > td.count-text';
    
    // Check if screener table exists
    const tableExists = await page.$(tableSelector) !== null;
    
    if (!tableExists) {
      // Check for "0 Total" message indicating no results
      const noResults = await page.$(noResultsSelector);
      
      if (noResults) {
        logger.info(`No results found for screener: ${screenerName}`);
        await captureScreenshot(page, `no_results_${sanitizeFilename(screenerName)}.png`);
        return { headers: [], rows: [] }; // Return empty data
      } else {
        // Unexpected page structure; capture screenshot for debugging
        logger.warn(`Screener table not found and no "No results" message detected for screener: ${screenerName}`);
        await captureScreenshot(page, `unexpected_page_${sanitizeFilename(screenerName)}.png`);
        return { headers: [], rows: [] };
      }
    }

    // If table exists, proceed to scrape data
    logger.info('Screener table found. Proceeding to scrape data.');
    
    // Extract headers and rows from the table with retry
    const tableData = await retryOperation(() => page.evaluate((selector) => {
      const table = document.querySelector(selector);
      if (!table) return { headers: [], rows: [] };

      // Get headers
      const headerRow = table.querySelector('thead tr');
      const headers = headerRow
        ? Array.from(headerRow.querySelectorAll('th')).map(th => th.innerText.trim())
        : [];

      // Get all data rows
      const rows = table.querySelectorAll('tbody tr');
      const rowData = Array.from(rows).map(row => {
        const cells = row.querySelectorAll('td');
        return Array.from(cells).map(cell => cell.innerText.trim());
      });

      return { headers, rows: rowData };
    }, tableSelector), 3, 2000);
    
    // Introduce a random delay after data extraction
    await new Promise(resolve => setTimeout(resolve, getRandomDelay()));

    // Handle pagination if necessary
    let combinedRows = [...tableData.rows];
    let hasNextPage = true;

    while (hasNextPage) {
      const nextPageSelector = '#screener_pagination > a.screener-pages.is-next';
      const isNextVisible = await page.evaluate(selector => {
        const button = document.querySelector(selector);
        return button && !button.disabled && button.offsetParent !== null; // Visible and not disabled
      }, nextPageSelector);
    
      if (isNextVisible) {
        logger.info('Navigating to next page...');
        try {
          await Promise.all([
            page.evaluate(selector => document.querySelector(selector).click(), nextPageSelector),
            page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 60000 })
          ]);
          logger.info('Navigated to next page.');
    
          // Introduce a random delay after navigation
          await new Promise(resolve => setTimeout(resolve, getRandomDelay()));

    
          // Scrape data from the new page with retry
          const newTableData = await retryOperation(() => page.evaluate((selector) => {
            const table = document.querySelector(selector);
            if (!table) return { headers: [], rows: [] };
    
            const rows = table.querySelectorAll('tbody tr');
            return {
              headers: [], // Assume headers are the same for all pages
              rows: Array.from(rows).map(row => {
                const cells = row.querySelectorAll('td');
                return Array.from(cells).map(cell => cell.innerText.trim());
              }),
            };
          }, tableSelector), 3, 2000);
    
          // Ensure `newTableData.rows` is defined
          if (newTableData && Array.isArray(newTableData.rows)) {
            logger.info(`Scraped ${newTableData.rows.length} rows from next page.`);
            combinedRows.push(...newTableData.rows);
          } else {
            logger.warn('No rows found on the next page. Ending pagination.');
            hasNextPage = false;
          }
        } catch (paginationError) {
          logger.error(`Error navigating to next page: ${paginationError.message}`);
          hasNextPage = false; // Exit the loop if navigation fails
        }
      } else {
        logger.info('No more pages to navigate.');
        hasNextPage = false;
      }
    }    

    logger.info(`Total rows scraped from screener: ${combinedRows.length}`);
    return { headers: tableData.headers, rows: combinedRows };

  } catch (err) {
    logger.error(`Error scraping screener at ${screenerURL}: ${err.message}`);
    await captureScreenshot(page, `error_${sanitizeFilename(screenerName)}.png`);
    return { headers: [], rows: [] }; // Return empty data to skip processing
  }
}

module.exports = {
  scrapeScreenerData,
};
