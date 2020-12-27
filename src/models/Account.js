const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
        title: { type: String, required: true },
        userId: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
