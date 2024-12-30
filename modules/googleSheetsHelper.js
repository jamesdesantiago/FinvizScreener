const { google } = require('googleapis');
const moment = require('moment-timezone');

async function appendToGoogleSheet(data, sheetId, auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  const timestamp = moment().tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');

  // Filter out rows where all columns after 'Screener' are empty
  const filteredData = data.filter(row => {
    const rowValues = Object.values(row);
    return rowValues.some((value, index) => index > 2 && value.trim() !== '');
  });

  const rows = filteredData.map(row => [
    timestamp, 
    ...Object.values(row)
  ]);

  const resource = {
    values: rows,
  };

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      resource,
    });
    console.log('Data successfully appended to Google Sheets.');
  } catch (error) {
    console.error('Error appending to Google Sheets:', error.message);
  }
}

module.exports = { appendToGoogleSheet };
