const logger       = require("$utils/logger");

process.on('uncaughtException', (error) => {
  logger.error('A fatal error occured (uncaught exception)', error)
})

process.on('unhandledRejection', (error) => {
  logger.error('A fatal error occured (unhandled rejection)', error)
})