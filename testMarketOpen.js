const { isMarketOpen } = require('./modules/isMarketOpen');

// Test for current market status (today)
isMarketOpen()
  .then(open => {
    console.log("Is the market open now?", open);
  })
  .catch(err => console.error("Error testing current market:", err));

// Test for a specific past date (modify the date as needed)
// For example, test December 1, 2018.
isMarketOpen(new Date("2025-02-17"))
  .then(open => {
    console.log("Was the market open on 2025-02-17?", open);
  })
  .catch(err => console.error("Error testing specific date:", err));
