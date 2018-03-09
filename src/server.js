"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var _debug = require("debug");
var App_1 = require("./App");
var debug = _debug("ts-express:server");
var port = normalizePort(process.env.PORT || 3000);
App_1.default.set("port", port);
var server = http.createServer(App_1.default);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
function normalizePort(val) {
    var _port = (typeof val === "string") ? parseInt(val, 10) : val;
    if (isNaN(_port))
        return val;
    if (_port >= 0)
        return _port;
    return false;
}
function onError(error) {
    if (error.syscall !== "listen")
        throw error;
    var bind = (typeof port === "string") ? "pipe " + port : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            break;
        default: throw error;
    }
    process.exit(1);
}
function onListening() {
    var addr = server.address();
    var bind = (typeof addr === "string") ? "pipe " + addr : "port " + addr.port;
    debug("listening on " + bind);
}
