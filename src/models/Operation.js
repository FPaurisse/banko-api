const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const operationSchema = new Schema({
    title: { type: String, required: true },
    amount: { type: String, required: true },
    date: { type: String, required: true }
});

const Operation = mongoose.model('Operation', operationSchema);

module.exports = Operation;
