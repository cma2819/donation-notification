import { config } from './config';
import { Notification } from './interfaces/Notification';
import { Donation } from './types/donation';

export class Logger implements Notification {

    notifyDonation(donation: Donation) {
        console.log('Receive donation:' + JSON.stringify(donation));
        return Promise.resolve();
    }

    logConfig() {
        console.log(config);
    }

}