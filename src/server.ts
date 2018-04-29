import * as http from 'http';
import opn = require('opn');

// Setup environment variables for the debugger...
process.env.DEBUG =
	process.env.NODE_ENV === 'production'
		? process.env.npm_package_config_prodDebugLevel
		: process.env.npm_package_config_devDebugLevel;

import * as _debug from 'debug';
import App from './App';

const debug = _debug('server');

// Set the specified port (or 3000).
const port = normalizePort(process.env.PORT || 3000);
App.set('port', port);

// Serve the app...
const server = http.createServer(App);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Open in browser (for dev mode only), while logging errors as an alert...
if (
	process.env.NODE_ENV === 'development' &&
	process.env.npm_package_config_reloadBrowserOnChange == 'true'
) {
	opn('http://127.0.0.1:3000').catch((err: Error) => {
		debug(`could not open in browser: ${err}`);
	});
}

function normalizePort(val: number | string): number | string | boolean {
	const _port: number = typeof val === 'string' ? parseInt(val, 10) : val;
	if (isNaN(_port)) return val;
	if (_port >= 0) return _port;
	return false;
}

function onError(error: NodeJS.ErrnoException) {
	// Only handling 'listen' errors!
	if (error.syscall !== 'listen') throw error;

	const bind = typeof port === 'string' ? `pipe ${port}` : `port ${port}`;
	switch (error.code) {
		case 'EACCES':
			console.error(`${bind} requires elevated privileges`);
			break;
		case 'EADDRINUSE':
			console.error(`${bind} is already in use`);
			break;
		default:
			throw error;
	}

	debug('exiting due to critical error...');
	process.exit(1);
}

function onListening() {
	// const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
	const bind = `port ${server.address().port}`;
	debug(`listening on ${bind}`);
}
