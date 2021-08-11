import axios from 'axios';
import { config } from './config';
import { Notification } from './interfaces/Notification';
import { Donation } from './types/donation';

export class Discord implements Notification {

    public constructor(
        protected username: string|undefined,
        protected webhookUrl: string,
    ) {}

    async notifyDonation(donation: Donation) {

        await axios.post(this.webhookUrl, {
            username: this.username,
            content: `JPY ${donation.amount} の寄付を受領しました。\n`
                    + `- Name: ${donation.donorVisibleName}\n`
                    + `- Comment: ${donation.comment || '(なし)'}`,
        });
    }

}