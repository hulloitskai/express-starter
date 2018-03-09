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
var JSONUtils_1 = require("../common/JSONUtils");
var PuppyRouter = (function (_super) {
    __extends(PuppyRouter, _super);
    function PuppyRouter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hitCount = 0;
        return _this;
    }
    PuppyRouter.prototype.registerRoutes = function () {
        this.router.get("/", this.getPuppies.bind(this));
    };
    PuppyRouter.prototype.getPuppies = function (req, res) {
        console.log("HIT!");
        this.hitCount += 1;
        JSONUtils_1.sendPrettyJSON(res, {
            messages: "Puppies API was hit!",
            requestQuery: req.query,
            requestIP: req.ip,
            count: this.hitCount
        });
    };
    return PuppyRouter;
}(CustomRouter_1.default));
exports.default = new PuppyRouter().export();
