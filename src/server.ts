import * as http from "http";
import * as _debug from "debug";

import App from "./App";

const debug = _debug("ts-express:server");

const port = normalizePort(process.env.PORT || 3000);
App.set("port", port);

// Serve the app...
const server = http.createServer(App);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val: number | string): number | string | boolean {
    const _port: number = (typeof val === "string") ? parseInt(val, 10) : val;
    if (isNaN(_port)) return val;
    if (_port >= 0 ) return _port;
    return false;
}

function onError(error: NodeJS.ErrnoException) {
    // Only handling 'listen' errors!
    if (error.syscall !== "listen") throw error;

    const bind = (typeof port === "string") ? `pipe ${port}` : `port ${port}`;
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`);
            break;
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            break;
        default: throw error;
    }
    process.exit(1);
}

function onListening() {
    const addr = server.address();
    const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`listening on ${bind}`);
}
