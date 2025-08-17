// modules/browser.js

const { chromium } = require('playwright');
const fs = require('fs');
const { logger } = require('./logger'); // Adjust if 'logger.js' is in the same "modules" folder

let blockedDomains = [];

/**
 * Loads blocked domains from the "blocked_domains.txt" file in the project root.
 */
function loadBlockedDomains() {
  try {
    if (!fs.existsSync('blocked_domains.txt')) {
      logger.info('blocked_domains.txt not found. Creating it now.');
      fs.writeFileSync('blocked_domains.txt', 'Blocked Domains List:\n');
    }

    const data = fs.readFileSync('blocked_domains.txt', 'utf8');
    blockedDomains = data
      .split('\n')
      .filter((line, index) => index > 0 && line.trim() !== '')
      .map(line => line.trim());

    if (blockedDomains.length === 0) {
      logger.info('No blocked domains found. You can add domains to block in the blocked_domains.txt file.');
    } else {
      logger.info(`${blockedDomains.length} blocked domains loaded.`);
    }
  } catch (error) {
    logger.error(`Error loading blocked domains: ${error}`);
    blockedDomains = [];
  }
}

/**
 * Main function to launch the browser with stealth & domain-blocking.
 */
async function launchBrowser() {
  // 1. Load any blocked domains from file
  loadBlockedDomains();

  // 2. Launch the browser (headless by default)
  const browser = await chromium.launch({
    headless: false,
    // If you want to watch the browser, set headless: false
    // and optionally add: args: ['--no-sandbox', ...]
  });

  // 3. Create a new browser context
  const context = await browser.newContext({
    userAgent: 
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/110.0.5481.100 Safari/537.36',
  });

  // 4. Stealth patches: hide 'webdriver', set minimal plugins, etc.
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
  
    Object.defineProperty(navigator, 'plugins', {
      get: () => [{ name: 'Chrome PDF Plugin' }]
    });
  
    Object.defineProperty(navigator, 'languages', {
      get: () => ['en-US', 'en'],
    });
  
    // Fake minimal chrome object
    window.chrome = { runtime: {} };
  });
  

  // 5. Increase default timeouts if needed (slow loads, Cloudflare, etc.)
  context.setDefaultTimeout(120000); // 2 minutes

  // 6. Intercept & block requests for any domain in blocked_domains
  await context.route('**/*', route => {
    const url = route.request().url();
    // If the URL includes any blocked domain, abort the request
    if (blockedDomains.some(domain => url.includes(domain))) {
      logger.debug(`Blocked: ${url}`);
      route.abort();
    } else {
      logger.debug(`Allowed: ${url}`);
      route.continue();
    }
  });

  // Return the browser & context so index.js can proceed
  return { browser, context };
}

// Export launchBrowser so index.js can import & call it
module.exports = {
  launchBrowser,
};
