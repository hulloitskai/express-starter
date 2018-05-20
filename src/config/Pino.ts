import * as pino from 'pino';
import * as pinoExpress from 'express-pino-logger';

const {
  npm_package_config_dev_log_level: devLevel,
  npm_package_config_prod_log_level: prodLevel,
  NODE_ENV
} = process.env;

const level = NODE_ENV === 'development' ? devLevel : prodLevel;
const serverLogger = pino({ name: 'server', level });
const expressLogger = pinoExpress({ name: 'express', level });

export { serverLogger, expressLogger };
