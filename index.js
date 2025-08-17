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
const { wasTradingDay } = require('./modules/isMarketOpen');
const moment = require('moment-timezone');

(async () => {
  // 1) Check if today is a trading day, but allow an override for testing
  const today = new Date();
  const override = process.env.MARKET_OVERRIDE === 'true';

  // Await the market status check
  if (!override && !(await wasTradingDay(today))) {
    logger.warn('🚫 Market is CLOSED today. Exiting script.');
    console.log('🚫 Market is CLOSED today. Exiting script.');
    return;
  }

  console.log(override ? '🔧 MARKET_OVERRIDE enabled. Running script anyway.' : '✅ Market is OPEN. Proceeding...');
  logger.info(override ? '🔧 MARKET_OVERRIDE enabled. Running script anyway.' : '✅ Market is OPEN. Proceeding...');

  let browser, context;
  const combinedData = [];
  const allHeaders = new Set(['Timestamp', 'Screener']); 

  // 2) Initialize Google Sheets API Auth
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  try {
    // 3) Launch Browser
    logger.info('🚀 Launching browser...');
    ({ browser, context } = await launchBrowser());

    // 4) Create a fresh page
    const page = await context.newPage();

    // 5) Go to Finviz homepage with retry
    logger.info('🌎 Navigating to Finviz homepage...');
    await retryOperation(
      () => page.goto('https://finviz.com', { waitUntil: 'networkidle0' }),
      3,
      2000
    );
    logger.info('✅ Finviz homepage loaded.');

    // 6) Handle privacy banner, random delay
    logger.info('🛑 Checking for privacy banner...');
    await handlePrivacyBanner(page);
    await new Promise(res => setTimeout(res, getRandomDelay()));
    logger.info('✅ Privacy banner handled.');

    // 7) Log in with retry + random delay
    logger.info('🔐 Logging in to Finviz...');
    await retryOperation(() => loginToFinviz(page), 3, 2000);
    await new Promise(res => setTimeout(res, getRandomDelay()));
    logger.info('✅ Logged in successfully!');

    // 8) Iterate over multiple screeners
    for (const screener of screenersList) {
      logger.info(`\n===== 📊 Running Screener: ${screener.name} =====`);
      // logger.info(`🔍 Navigating to screener URL: ${screener.url}`);

      try {
        const { headers, rows } = await retryOperation(
          () => scrapeScreenerData(page, screener.url, screener.name),
          3,
          2000
        );

        if (rows.length === 0) {
          logger.warn(`⚠️ No data found for screener: ${screener.name}. Skipping.`);
          continue;
        }

        logger.info(`📊 Scraped ${rows.length} rows from ${screener.name}.`);
        headers.forEach(header => allHeaders.add(header));

        // Add timestamp & screener name to each row
        const timestamp = moment().tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
        const formattedData = rows.map(row => {
          const rowObj = { Timestamp: timestamp, Screener: screener.name };
          headers.forEach((h, idx) => {
            rowObj[h] = row[idx] || '';
          });
          return rowObj;
        });

        combinedData.push(...formattedData);
        logger.info(`✅ Data for ${screener.name}: ${formattedData.length} rows`);

        if (screener.requiresAdvancedLogic) {
          await runAdvancedActions(page, formattedData, screener);
          await new Promise(res => setTimeout(res, getRandomDelay()));
        }

        await new Promise(res => setTimeout(res, getRandomDelay()));

      } catch (screenerError) {
        logger.error(`❌ Error running screener ${screener.name}: ${screenerError.message}`);
      }
    }

    // 9) Prepare the data for Google Sheets
    const headersArray = Array.from(allHeaders);
    const formattedCombinedData = combinedData.map(row => {
      const rowObj = {};
      headersArray.forEach(h => {
        rowObj[h] = row[h] || '';
      });
      return rowObj;
    });

    if (formattedCombinedData.length > 0) {
      const sheetId = process.env.GOOGLE_SHEET_ID;
      await appendToGoogleSheet(formattedCombinedData, sheetId, await auth.getClient());
      logger.info('📤 Data successfully appended to Google Sheets.');
    } else {
      logger.info('⚠️ No data scraped from any screener.');
    }

  } catch (err) {
    logger.error(`❌ Global Error: ${err.message}`);
  } finally {
    if (browser) {
      await browser.close();
      logger.info('🛑 Browser closed.');
    }
  }
})();
