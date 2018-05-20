import * as http from 'http';
import * as getPort from 'get-port';
import * as dotenv from 'dotenv';
import { Application } from 'express';

import App from './App';
import { serverLogger as logger } from './imports';
import opn = require('opn');
import ErrnoException = NodeJS.ErrnoException;

dotenv.load(); // Load .env variables

start(App);

async function start(app: Application) {
  // Set the listening port
  const DEFAULT_PORT = 3000;
  const port = await getPort(process.env.PORT || DEFAULT_PORT);
  const bind = `port ${port}`;

  // Serve the app using `http`...
  const server = http.createServer(app);
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  function onListening() {
    logger.info('listening on %s', bind);

    // Open in browser (for dev mode only), while logging errors as an alert...
    const { NODE_ENV, npm_package_config_browser_live_reload: liveReload } = process.env;
    if (NODE_ENV === 'development' && liveReload) {
      opn(`http://127.0.0.1:${port}`).catch((err: Error) =>
        logger.warn('could not open in browser: %O', err)
      );
    }
  }

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
    process.exit(1);
  }
}
