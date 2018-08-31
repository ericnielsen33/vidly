var winston = require("winston");
require("winston-mongodb");

// define the custom settings for each transport (file, console)
var options = {
  file: {
    filename: "app.log",
    json: true,
    maxsize: 5242880, // 5MB
  },
  console: {
    handleExceptions: true,
    json: true,
    colorize: true
  },
  mongodb: {
    db: "mongodb://localhost/vidly",
    json: true,
    level: "error",
  },
  exceptions: {
    filename: "exceptions.log"
  }
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    new winston.transports.Console(options.console),
    new winston.transports.File(options.file),
    new winston.transports.MongoDB(options.mongodb)
  ],
  exitOnError: false,
  exceptionHandlers: [
    new winston.transports.File(options.exceptions)
  ]
});

module.exports = logger;
