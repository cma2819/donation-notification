export type Donation = {
    type: string;
    id: number;
    timereceived: Date;
    comment: string;
    amount: number;
    donorVisibility: string;
    donorVisibleName: string;
    newTotal: number;
    domain: string
}