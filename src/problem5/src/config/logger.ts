import { format, createLogger, transports } from 'winston';
import config from './config';
import { LogLevel, NodeEnv } from './enum';

const logger = createLogger({
  level: config.env === NodeEnv.Development ? LogLevel.Debug : LogLevel.Info,
  format: format.combine(
    format.prettyPrint(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),

    format.printf((info) => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`),
    format.colorize({ all: true, message: false }),
  ),
  transports: [
    new transports.Console({
      stderrLevels: [LogLevel.Error],
    }),
  ],
});
export default logger;
