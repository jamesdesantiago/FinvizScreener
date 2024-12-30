// browser.js
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

async function launchBrowser() {
  return puppeteer.launch({
    headless: false, // Set to true for headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // Useful for certain environments
    defaultViewport: null, // Use the default viewport size
  });
}

module.exports = {
  launchBrowser,
};
