// Console statements are intentionally used for Apps Script logging
// Apps Script logs can be viewed in the Apps Script Dashboard
const LOG_LEVEL = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
};

export const logError = (context, error) => {
  console.error(
    JSON.stringify({
      level: LOG_LEVEL.ERROR,
      context,
      error: error.message || error,
      timestamp: new Date().toISOString(),
    }),
  );
};

export const logWarning = (context, message) => {
  console.warn(
    JSON.stringify({
      level: LOG_LEVEL.WARNING,
      context,
      message,
      timestamp: new Date().toISOString(),
    }),
  );
};

export const logInfo = (context, message) => {
  console.info(
    JSON.stringify({
      level: LOG_LEVEL.INFO,
      context,
      message,
      timestamp: new Date().toISOString(),
    }),
  );
};
