"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CustomRouter = (function () {
    function CustomRouter() {
        this.router = express_1.Router();
        this.registerRoutes();
    }
    CustomRouter.prototype.export = function () { return this.router; };
    return CustomRouter;
}());
exports.default = CustomRouter;
