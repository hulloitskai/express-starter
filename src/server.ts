import * as http from 'http';
import * as _getPort from 'get-port';
import * as dotenv from 'dotenv';
import { Application } from 'express';

import App from './App';
import { serverLogger as logger } from './imports';
import opn = require('opn');
type ErrnoException = NodeJS.ErrnoException;

dotenv.load(); // Load .env variables

const app = new App().export(); // Start application
start(app);

/** Main thread logic. */
function start(app: Application) {
  try {
    getPort().then(listenOnPort);
  } catch (e) {
    logger.fatal(`An unknown fatal error occurred: ${e}`);
    process.exit(1);
  }
}

/** Get the port using `get-port`. */
async function getPort() {
  const DEFAULT_PORT = 3000;
  return await _getPort(process.env.PORT || DEFAULT_PORT);
}

/** Configure the Express server to listen on the specified port. */
function listenOnPort(port) {
  const bind = `port ${port}`; // Set the listening port

  const server = http.createServer(app); // Serve the app using `http`
  server.listen(port);
  server.on('listening', onListening);
  server.on('error', onError);

  /** Runs upon successful listen */
  function onListening() {
    logger.info('listening on %s', bind);

    // Open in browser (for dev mode only), while logging errors as an alert...
    const {
      NODE_ENV,
      IS_DOCKER,
      npm_package_config_browser_live_reload: LIVE_RELOAD
    } = process.env;
    if (
      NODE_ENV === 'development' &&
      LIVE_RELOAD === 'true' &&
      IS_DOCKER !== 'true'
    ) {
      opn(`http://127.0.0.1:${port}`).catch((err: Error) =>
        logger.warn('could not open in browser: %O', err)
      );
    }
  }

  /** Runs upon server failure */
  function onError(error: ErrnoException) {
    // Only handling 'listen' errors!
    if (error.syscall !== 'listen') throw error;

    switch (error.code) {
      case 'EACCES':
        logger.fatal('%s requires elevated privileges', bind);
        break;
      case 'EADDRINUSE':
        logger.fatal('%s is already in use', bind);
        break;
      default:
        logger.fatal('http server ran into a fatal error: %O', error);
    }

    logger.fatal('exiting due to critical error...');
    process.exit(2);
  }
}
