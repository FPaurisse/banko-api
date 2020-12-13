const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
        title: { type: String, required: true },
        accountId: { type: String, required: true },
        userId: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
