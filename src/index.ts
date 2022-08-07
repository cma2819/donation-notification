import WebSocket from 'ws';
import { config } from './config';
import { Discord } from './discord';
import { donationFromPayload } from './donation';
import { Notification } from './interfaces/Notification';
import { Logger } from './logger';
import { Donation } from './types/donation';

const logger = new Logger;
const discord = new Discord(config.discord.username, config.discord.webhook);
const notifications: Notification[] = [discord];

if (config.logging) {
    logger.logConfig();
    notifications.push(logger);
}

const notifyAll = (donation: Donation) => {
    return Promise.all(notifications.map((notification) => {
        return notification.notifyDonation(donation);
    }));
}

let donationWs: WebSocket|null = null;
let reconnectInterval: NodeJS.Timer|null = null;

const connect = () => {
    donationWs = new WebSocket(
        config.tracker.wsUrl,
        {origin: config.tracker.wsUrl}
    );
    
    donationWs.addEventListener('message', ({data}) => {
        const donation = donationFromPayload(data);
        notifyAll(donation);
    });
    
    donationWs.addEventListener('close', ({wasClean, code, reason}) => {
        console.log('websocket closed:', {wasClean, code, reason});
        console.log('attempt to reconnect in 10 secs.');
        reconnectInterval = setInterval(() => {
            connect();
        }, 10 * 1000)
    });

    donationWs.addEventListener('error', ({type, message}) => {
        console.error('websocket error:', {type, message});
    });

    donationWs.addEventListener('open', () => {
        console.log('websocket opened');
        if (reconnectInterval) {
            clearInterval(reconnectInterval)   
        }
    });
}

connect();