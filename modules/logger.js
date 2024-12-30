// modules/logger.js
const fs = require('fs');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');
const { createLogger, format, transports } = require('winston');

// Define the path to the logs directory
const logsDir = path.join(__dirname, 'logs');

// Create the logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Initialize Winston logger
const logger = createLogger({
  level: 'info', // Set the minimum log level to 'info'
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss' // Timestamp format
    }),
    format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
  ),
  transports: [
    // - Write all logs with level 'error' and below to 'error.log'
    new transports.File({ filename: path.join(logsDir, 'error.log'), level: 'error' }),
    
    // - Write all logs with level 'info' and below to 'combined.log'
    new transports.File({ filename: path.join(logsDir, 'combined.log') }),
    
    // - Also log to the console
    new transports.Console(),
  ],
});

/**
 * Writes combined data from all screeners to a CSV file.
 * @param {Array<Object>} data - Array of objects representing rows to write.
 * @param {string} filename - Name of the CSV file.
 */
async function writeDataToCSV(data, filename) {
  if (!data || data.length === 0) {
    logger.info('No data available to write.');
    return;
  }

  // Define the full path for the CSV file
  const filePath = path.join(logsDir, filename);

  // Extract headers from the data
  const headers = Object.keys(data[0]).map(key => ({ id: key, title: key }));

  // Create the CSV writer
  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: headers,
    append: false, // Overwrite the file if it exists
  });

  try {
    // Write the data to the CSV file
    await csvWriter.writeRecords(data);
    logger.info(`Data successfully written to ${filePath}`);
  } catch (err) {
    logger.error(`Error writing CSV: ${err.message}`);
  }
}

module.exports = {
  logger,
  writeDataToCSV,
};
