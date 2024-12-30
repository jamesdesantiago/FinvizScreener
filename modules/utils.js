// modules/utils.js

const { logger } = require('./logger'); // Import the Winston logger

/**
 * Sanitizes a filename by removing or replacing invalid characters.
 * @param {string} name - The original filename.
 * @returns {string} - The sanitized filename.
 */
function sanitizeFilename(name) {
  return name.replace(/[^a-z0-9_\-]/gi, '_');
}

/**
 * Retries an asynchronous operation a specified number of times.
 * @param {Function} operation - The async function to retry.
 * @param {number} retries - Number of retry attempts (default: 3).
 * @param {number} delay - Delay between retries in milliseconds (default: 2000ms).
 * @returns {Promise} - Resolves if operation succeeds within retries.
 */
async function retryOperation(operation, retries = 3, delay = 2000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await operation();
    } catch (err) {
      if (attempt < retries) {
        logger.warn(`Attempt ${attempt} failed: ${err.message}. Retrying in ${delay}ms...`);
        await new Promise(res => setTimeout(res, delay));
      } else {
        logger.error(`All ${retries} attempts failed: ${err.message}`);
        throw err;
      }
    }
  }
}

/**
 * Generates a random delay between min and max milliseconds.
 * @param {number} min - Minimum delay in milliseconds (default: 1000ms).
 * @param {number} max - Maximum delay in milliseconds (default: 3000ms).
 * @returns {number} - Random delay in milliseconds.
 */
function getRandomDelay(min = 1000, max = 3000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  sanitizeFilename,
  retryOperation,
  getRandomDelay,
};
