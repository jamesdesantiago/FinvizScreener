// login.js

async function loginToFinviz(page) {
    // Navigate to the login page
    await page.goto('https://finviz.com/login.ashx', { waitUntil: 'networkidle2' });
  
    const emailSelector = 'input[name=email]';
    const passwordSelector = 'input[name=password]';
    const loginButtonSelector = 'body > div.content > div > div > form > input';
  
    // Type in email
    await page.waitForSelector(emailSelector, { timeout: 5000 });
    await page.type(emailSelector, process.env.FINVIZ_EMAIL, { delay: 50 });
  
    // Type in password
    await page.waitForSelector(passwordSelector, { timeout: 5000 });
    await page.type(passwordSelector, process.env.FINVIZ_PASSWORD, { delay: 50 });
  
    // Click login
    await Promise.all([
      page.click(loginButtonSelector),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);
  
    console.log('Logged in successfully!');
  }
  
  module.exports = {
    loginToFinviz,
  };
  