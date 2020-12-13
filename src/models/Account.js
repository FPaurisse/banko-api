const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
        title: { type: String, required: true },
        userId: { type: String, required: true },
        isDefault: { type: Boolean, required: true },
        guests: { type: Array }
    },
    {
        timestamps: true
    }
);

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
