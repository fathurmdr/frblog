import os from "os";
import winston from "winston";

const { combine, timestamp, json } = winston.format;

const hostname = () =>
  winston.format((info) => {
    info.hostname = os.hostname();
    return info;
  })();

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), hostname(), json({})),
  transports: [new winston.transports.Console({})],
});

export default logger;
