"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importDefault(require("ws"));
var config_1 = require("./config");
var discord_1 = require("./discord");
var donation_1 = require("./donation");
var logger_1 = require("./logger");
var logger = new logger_1.Logger;
var discord = new discord_1.Discord(config_1.config.discord.username, config_1.config.discord.webhook);
var notifications = [discord];
if (config_1.config.logging) {
    logger.logConfig();
    notifications.push(logger);
}
var notifyAll = function (donation) {
    return Promise.all(notifications.map(function (notification) {
        return notification.notifyDonation(donation);
    }));
};
var donationWs = null;
var reconnectInterval = null;
var connect = function () {
    donationWs = new ws_1.default(config_1.config.tracker.wsUrl, { origin: config_1.config.tracker.wsUrl });
    donationWs.addEventListener('message', function (_a) {
        var data = _a.data;
        var donation = donation_1.donationFromPayload(data);
        notifyAll(donation);
    });
    donationWs.addEventListener('close', function (_a) {
        var wasClean = _a.wasClean, code = _a.code, reason = _a.reason;
        console.log('websocket closed:', { wasClean: wasClean, code: code, reason: reason });
        console.log('attempt to reconnect in 10 secs.');
        reconnectInterval = setInterval(function () {
            connect();
        }, 10 * 1000);
    });
    donationWs.addEventListener('error', function (_a) {
        var type = _a.type, message = _a.message;
        console.error('websocket error:', { type: type, message: message });
    });
    donationWs.addEventListener('open', function () {
        console.log('websocket opened');
        if (reconnectInterval) {
            clearInterval(reconnectInterval);
        }
    });
};
connect();
