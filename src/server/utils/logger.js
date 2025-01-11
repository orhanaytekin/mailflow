// Console statements are intentionally used for Apps Script logging
// Apps Script logs can be viewed in the Apps Script Dashboard
const LOG_LEVEL = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
};

export const logError = (context, error, metadata = {}) => {
  const errorDetails = {
    timestamp: new Date().toISOString(),
    context,
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name,
    },
    metadata,
    user: Session.getEffectiveUser().getEmail(),
  };

  console.error(JSON.stringify(errorDetails, null, 2));
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
