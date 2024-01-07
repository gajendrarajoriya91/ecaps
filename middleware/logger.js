const winston = require("winston");
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf } = format;
const DailyRotateFile = require("winston-daily-rotate-file");

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp({ format: "DD-MM-YYYY HH:mm:ss" }), logFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      dirname: "logs",
      filename: "application-%DATE%.log",
      datePattern: "DD-MM-YYYY",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

module.exports = logger;
