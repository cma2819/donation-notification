import { Donation } from '../types/donation';

export interface Notification {
    notifyDonation(donation: Donation): Promise<void>;
}