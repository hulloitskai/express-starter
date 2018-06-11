import * as dotenv from 'dotenv';
import { Application } from 'express';
import * as _getPort from 'get-port';
import * as http from 'http';
import { install as installSourceMaps } from 'source-map-support';
import opn = require('opn');

import App from './App';
import { serverLogger as logger } from './imports';

// Make V8 refer back to Typescript code when outputting messages
if (process.env.NODE_ENV === 'development') installSourceMaps();
// Load .env variables upon entry, if available
dotenv.load();

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
async function getPort(): Promise<string> {
  const DEFAULT_PORT = 3000;
  return await _getPort(process.env.PORT || DEFAULT_PORT);
}

/** Configure the Express server to listen on the specified port. */
function listenOnPort(port: string) {
  const server = http.createServer(app); // Serve the app using `http`
  server.listen(port);
  server.on('listening', onListening);
  server.on('error', onError);
}

/** Returns a function to be called upon successful listen. */
function onListening(port: string) {
  return function() {
    logger.info('Listening on port %s...', port);

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
        logger.warn('Could not open in browser: %O', err)
      );
    }
  };
}

/** Returns a function to be called upon server listening failure. */
function onError(port: string) {
  return function(err: NodeJS.ErrnoException) {
    // Only handling 'listen' errors!
    if (err.syscall !== 'listen') throw err;

    switch (err.code) {
      case 'EACCES':
        logger.fatal('Port %s requires elevated privileges.', port);
        break;
      case 'EADDRINUSE':
        logger.fatal('Port %s is already in use.', port);
        break;
      default:
        logger.fatal('HTTP server ran into a fatal error: %O', err);
    }

    logger.fatal('Exiting due to critical error...');
    process.exit(2);
  };
}
