const Alpaca = require('@alpacahq/alpaca-trade-api');
const moment = require('moment-timezone');

// Initialize Alpaca with your API keys.
const alpaca = new Alpaca({
  keyId: process.env.ALPACA_KEY_ID,
  secretKey: process.env.ALPACA_SECRET_KEY,
  paper: true, // Use 'false' for a live account.
});

async function wasTradingDay(date = new Date()) {
  // Convert the input date to Eastern Time (YYYY-MM-DD).
  const inputDate = moment(date).tz("America/New_York").format("YYYY-MM-DD");

  try {
    // Fetch calendar data for this date.
    const calendars = await alpaca.getCalendar({
      start: inputDate,
      end: inputDate,
    });
    
    // If we got a calendar entry for that date, it was a trading day.
    return calendars && calendars.length > 0;
  } catch (err) {
    console.error('Error fetching market calendar:', err);
    throw err;
  }
}

module.exports = { wasTradingDay };
