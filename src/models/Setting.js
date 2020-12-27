const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const settingSchema = new Schema({
        userId: { type: String, required: true },
        accountIdByDefault: { type: String }
    },
    {
        timestamps: true
    }
);

const Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting;
