import * as pino from 'pino';
import * as pinoExpress from 'express-pino-logger';

const {
  npm_package_config_dev_log_level: DEV_LOG_LEVEL,
  npm_package_config_prod_log_level: PROD_LOG_LEVEL,
  LOG_LEVEL: ENV_LOG_LEVEL,
  NODE_ENV
} = process.env;

const level =
  ENV_LOG_LEVEL || NODE_ENV === 'development' ? DEV_LOG_LEVEL : PROD_LOG_LEVEL;
const serverLogger = pino({ name: 'server', level });
const expressLogger = pinoExpress({ name: 'express', level });

export { serverLogger, expressLogger };
