// screenshotHelper.js
const fs = require('fs');
const path = require('path');

/**
 * Captures a screenshot of the current page.
 * @param {puppeteer.Page} page - The Puppeteer page instance.
 * @param {string} filename - The name of the screenshot file.
 */
async function captureScreenshot(page, filename) {
  const screenshotsDir = path.join(__dirname, 'screenshots');
  
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }
  
  const filepath = path.join(screenshotsDir, filename);
  
  try {
    await page.screenshot({ path: filepath, fullPage: true });
    console.log(`Screenshot saved: ${filepath}`);
  } catch (err) {
    console.error('Error capturing screenshot:', err);
  }
}

module.exports = {
  captureScreenshot,
};
