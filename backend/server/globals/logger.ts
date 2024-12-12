import { Express } from 'express';
import { existsSync, mkdirSync } from 'fs';
import pino from 'pino';
import pinoHTTP from 'pino-http';
import { Environment } from '@utils/const';

const currentDate = new Date().toLocaleDateString('sv');

const FOLDER_LOG = './logs';

if (!existsSync(FOLDER_LOG)) {
  mkdirSync(FOLDER_LOG, { recursive: true });
}

const APP_LOG = `${FOLDER_LOG}/app-${currentDate}.log`;
const isDevMode = process.env.NODE_ENV === Environment.development;
const defaultLogLevel = isDevMode ? `info` : `error`;

const logger = pino({
  name: `base-logger`,
  level: process.env.LOG_LEVEL || defaultLogLevel,
  formatters: {
    bindings: (bindings) => {
      return {
        pid: bindings.pid,
        host: bindings.hostname,
        node_version: process.version,
      };
    },
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  // timestamp: pino.stdTimeFunctions.isoTime,
  timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
  // customLevels: levels,
  // useOnlyCustomLevels: true,
}, isDevMode ? process.stdout : pino.destination(APP_LOG));

// logger.fatal('fatal');
// logger.error('error');
// logger.warn('warn');
// logger.info('info');
// logger.debug('debug');
// logger.trace('trace');

function loggerHttp(app: Express) {
  app.use(
    pinoHTTP({
      logger,
    })
  )
}

function getLogger(options = {}) {
  return logger.child(options);
};

export {
  logger,
  loggerHttp,
  getLogger,  
};
