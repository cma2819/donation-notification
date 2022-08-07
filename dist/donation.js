"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationFromPayload = void 0;
var validateDonation = function (data) {
    if (typeof data.type !== 'string'
        || typeof data.id !== 'number'
        || typeof data.timereceived !== 'string'
        || typeof data.comment !== 'string'
        || typeof data.amount !== 'number'
        || typeof data.donor__visibility !== 'string'
        || typeof data.donor__visiblename !== 'string'
        || typeof data.new_total !== 'number'
        || typeof data.domain !== 'string') {
        return false;
    }
    return true;
};
var donationFromPayload = function (payload) {
    var data = JSON.parse(payload);
    if (!validateDonation(data)) {
        throw new Error('Invalid donation data.');
    }
    return {
        type: data.type,
        id: data.id,
        timereceived: new Date(data.timereceived),
        comment: data.comment,
        amount: data.amount,
        donorVisibility: data.donor__visibility,
        donorVisibleName: data.donor__visiblename,
        newTotal: data.new_total,
        domain: data.domain
    };
};
exports.donationFromPayload = donationFromPayload;
