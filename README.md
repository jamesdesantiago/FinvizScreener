# Finviz Screener

A project to scrape Finviz data using Puppeteer, integrate it with Google Sheets, and handle advanced data operations. This package is ideal for traders and analysts looking to automate Finviz data collection.

---

## Features

- **Scrape Finviz Screeners:** Extract stock data from Finviz screeners efficiently.
- **Google Sheets Integration:** Automatically append scraped data to a Google Sheet.
- **Advanced Logic:** Handle pagination and custom logic for specific screeners.
- **Built-in Delays and Stealth Mode:** Avoid detection by using Puppeteer Extra and randomized delays.
- **Apache 2.0 License:** Open-source and ready for customization.

---

## Installation

Install the package via NPM:

```bash
npm install finviz-screener
```

---

## Usage

### Environment Setup

Create a `.env` file in your project root with the following:

```plaintext
FINVIZ_EMAIL=your_finviz_email@example.com
FINVIZ_PASSWORD=your_finviz_password
GOOGLE_SERVICE_ACCOUNT_KEY=path/to/your-service-account-key.json
GOOGLE_SHEET_ID=your_google_sheet_id
```

Ensure your `.env` file and sensitive credentials are never committed to source control.

### Basic Example

Here’s an example of how to scrape Finviz data and append it to Google Sheets:

```javascript
const { scrapeScreenerData } = require('finviz-screener');

(async () => {
  try {
    const data = await scrapeScreenerData('https://finviz.com/screener.ashx?v=111');
    console.log('Scraped Data:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
```

### Advanced Example

Run multiple screeners and append the results to a Google Sheet:

```javascript
const { runMultipleScreeners } = require('finviz-screener');
const screenersList = [
  {
    name: 'S&P 500',
    url: 'https://finviz.com/screener.ashx?v=111&f=idx_sp500',
    requiresAdvancedLogic: false
  },
  {
    name: 'High Volume',
    url: 'https://finviz.com/screener.ashx?v=111&f=sh_avgvol_o1000',
    requiresAdvancedLogic: true
  }
];

(async () => {
  try {
    const results = await runMultipleScreeners(screenersList);
    console.log('Combined Results:', results);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
```

---

## API Reference

### scrapeScreenerData(url)

Scrapes data from a given Finviz screener URL.

- **url**: The URL of the Finviz screener.
- **Returns**: A promise resolving to the scraped data.

### runMultipleScreeners(screenersList)

Runs multiple screeners and combines the results.

- **screenersList**: An array of screener objects with `name`, `url`, and `requiresAdvancedLogic`.
- **Returns**: A promise resolving to combined results.

---

## Google Sheets Integration

### Setting Up Google Cloud

1. Create a Google Cloud project.
2. Enable the Google Sheets API.
3. Create a service account and download the JSON key.
4. Share your Google Sheet with the service account email.

### Appending Data

The package automatically appends data to your Google Sheet in real-time. Ensure the `GOOGLE_SERVICE_ACCOUNT_KEY` and `GOOGLE_SHEET_ID` are set in your `.env` file.

---

## License

This project is licensed under the Apache 2.0 License. See the LICENSE file for details.

---

## Contributing

Contributions are welcome! Feel free to fork the repository, submit issues, or create pull requests.

---

## Author

James De Santiago
