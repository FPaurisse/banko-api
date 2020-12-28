const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
        userId: { type: String, required: true },
        title: { type: String, required: true },
        guests: { type: Array },
        guestAccount: { type: Boolean },
    },
    {
        timestamps: true
    }
);

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
