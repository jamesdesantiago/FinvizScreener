require('dotenv').config();
const { google } = require('googleapis');
const { appendToGoogleSheet } = require('./modules/googleSheetsHelper');
const { launchBrowser } = require('./modules/browser');
const { handlePrivacyBanner } = require('./modules/privacyBanner');
const { loginToFinviz } = require('./modules/login');
const { scrapeScreenerData } = require('./modules/screener');
const screenersList = require('./modules/screenersList');
const { runAdvancedActions } = require('./modules/advancedActions');
const { logger } = require('./modules/logger');
const { captureScreenshot } = require('./modules/screenshotHelper');
const { sanitizeFilename, retryOperation, getRandomDelay } = require('./modules/utils');
const moment = require('moment-timezone');

(async () => {
  let browser;
  const combinedData = []; // Array to hold all data from all screeners
  const allHeaders = new Set(['Timestamp', 'Screener']); // Add Timestamp and Screener columns

  // Initialize Google Sheets API authentication
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY, // Path to the JSON key file
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  try {
    // 1. Launch Browser
    logger.info('Launching browser...');
    browser = await launchBrowser();

    // 2. Create a new page
    const page = await browser.newPage();

    // 3. Go to Finviz homepage with retry
    logger.info('Navigating to Finviz homepage...');
    await retryOperation(() => page.goto('https://finviz.com', { waitUntil: 'domcontentloaded' }), 3, 2000);
    await captureScreenshot(page, 'after_navigating_to_finviz.png');
    logger.info('Finviz homepage loaded.');

    // 4. Handle privacy banner with random delay
    logger.info('Handling privacy banner...');
    await handlePrivacyBanner(page);
    await captureScreenshot(page, 'after_privacy_banner.png');
    await new Promise(resolve => setTimeout(resolve, getRandomDelay())); // Random delay
    logger.info('Privacy banner handled.');

    // 5. Log in with retry and random delay
    logger.info('Logging in to Finviz...');
    await retryOperation(() => loginToFinviz(page), 3, 2000);
    await captureScreenshot(page, 'after_login.png');
    await new Promise(resolve => setTimeout(resolve, getRandomDelay())); // Random delay
    logger.info('Logged in successfully!');

    // 6. Run multiple screeners
    for (const screener of screenersList) {
      logger.info(`\n===== Running Screener: ${screener.name} =====`);

      // Navigate to the screener and scrape data with retry
      logger.info(`Navigating to screener URL: ${screener.url}`);

      try {
        const { headers, rows } = await retryOperation(() => scrapeScreenerData(page, screener.url, screener.name), 3, 2000);

        if (rows.length === 0) {
          logger.info(`No data found for screener: ${screener.name}. Skipping to next screener.`);
          continue; // Skip to the next screener
        }

        logger.info(`Scraped ${rows.length} rows from ${screener.name}.`);

        // Update headers set with new headers from this screener
        headers.forEach(header => allHeaders.add(header));

        // Add timestamp and screener name to each row and format data
        const timestamp = moment().tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
        const formattedData = rows.map(row => {
          const rowObj = { Timestamp: timestamp, Screener: screener.name };
          headers.forEach((header, index) => {
            rowObj[header] = row[index] || ''; // Handle missing data
          });
          return rowObj;
        });

        // Combine data
        combinedData.push(...formattedData);

        // Log or store your data
        logger.info(`Data for ${screener.name}: ${formattedData.length} rows`);

        // If screener has advanced logic, run it with random delay
        if (screener.requiresAdvancedLogic) {
          await runAdvancedActions(page, formattedData, screener);
          await new Promise(resolve => setTimeout(resolve, getRandomDelay())); // Random delay
        }

        // Introduce a random delay after each screener
        await new Promise(resolve => setTimeout(resolve, getRandomDelay()));


      } catch (screenerError) {
        logger.error(`Error running screener ${screener.name}: ${screenerError.message}`);
        // await captureScreenshot(page, `error_${sanitizeFilename(screener.name)}.png`);
        // Continue to next screener even if there's an error
      }
    }

    // 7. Prepare headers array for Google Sheets
    const headersArray = Array.from(allHeaders);

    // 8. Ensure all data objects have consistent keys
    const formattedCombinedData = combinedData.map(row => {
      const formattedRow = {};
      headersArray.forEach(header => {
        formattedRow[header] = row[header] || ''; // Fill missing fields with empty strings
      });
      return formattedRow;
    });

    // 9. Append combined data to Google Sheets
    if (formattedCombinedData.length > 0) {
      const sheetId = process.env.GOOGLE_SHEET_ID;

      // Pass the auth client to the appendToGoogleSheet function
      await appendToGoogleSheet(formattedCombinedData, sheetId, await auth.getClient());
      logger.info('Data successfully appended to Google Sheets.');
    } else {
      logger.info('No data scraped from any screener.');
    }
  } catch (err) {
    logger.error(`Global Error: ${err.message}`);
    if (browser) {
      const pages = await browser.pages();
      const page = pages.length > 0 ? pages[0] : null;
      if (page) {
        await captureScreenshot(page, 'error_global.png'); // Capture screenshot on global error
      }
    }
  } finally {
    if (browser) {
      await browser.close();
      logger.info('Browser closed.');
    }
  }
})();
