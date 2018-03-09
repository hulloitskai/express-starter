"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CustomRouter_1 = require("../common/CustomRouter");
var PuppyRouter_1 = require("./PuppyRouter");
var APIRouter = (function (_super) {
    __extends(APIRouter, _super);
    function APIRouter() {
        return _super.call(this) || this;
    }
    APIRouter.prototype.registerRoutes = function () {
        this.router.get("/", function (_, res) { return res.json("The API is working!"); });
        this.router.use("/puppies", PuppyRouter_1.default);
    };
    return APIRouter;
}(CustomRouter_1.default));
exports.APIRouter = APIRouter;
exports.default = new APIRouter().export();
