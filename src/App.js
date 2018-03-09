"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var APIRouter_1 = require("./api-routes/APIRouter");
var App = (function () {
    function App() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    App.prototype.middleware = function () {
        if (process.env.NODE_ENV !== "production")
            this.express.use(logger("dev"));
        this.express.use("/api/**/*", bodyParser.json());
        this.express.use("/api/**/*", bodyParser.urlencoded({ extended: false }));
    };
    App.prototype.routes = function () {
        var distDir = path.join(__dirname, "..", "dist");
        var index = path.resolve(distDir, "index.html");
        this.express.use("/api", APIRouter_1.default);
        this.express.use(express.static(distDir));
        this.express.get(/^(?!\/api).+$/, function (req, res, next) {
            res.sendFile(index);
        });
    };
    return App;
}());
exports.default = new App().express;
