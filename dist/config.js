"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var config_1 = __importDefault(require("config"));
var validateConfig = function (config) {
    // validate tracker config
    var trackerConfig = config.tracker;
    if (typeof trackerConfig.wsUrl !== 'string') {
        return false;
    }
    // validate discord config
    var discordConfig = config.discord;
    if (typeof discordConfig.webhook !== 'string') {
        return false;
    }
    return true;
};
var loadedConfig = config_1.default;
if (!validateConfig(loadedConfig)) {
    throw new Error('Config is invalid.');
}
;
exports.config = loadedConfig;
