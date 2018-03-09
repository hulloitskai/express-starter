"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendPrettyJSON(res, obj, spacing) {
    if (spacing === void 0) { spacing = 2; }
    res.set("Content-Type", "application/json");
    res.send(JSON.stringify(obj, null, spacing));
}
exports.sendPrettyJSON = sendPrettyJSON;
