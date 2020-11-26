const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const operationSchema = new Schema({
    title: { type: String, required: true },
    amount: { type: String, required: true },
    date: { type: String, required: true },
    isPassed: { type: Boolean, required: true },
    isCredit: { type: Boolean, required: true },
    userId: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const Operation = mongoose.model('Operation', operationSchema);

module.exports = Operation;
