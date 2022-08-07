"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var config_1 = require("./config");
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.notifyDonation = function (donation) {
        console.log('Receive donation:' + JSON.stringify(donation));
        return Promise.resolve();
    };
    Logger.prototype.logConfig = function () {
        console.log(config_1.config);
    };
    return Logger;
}());
exports.Logger = Logger;
