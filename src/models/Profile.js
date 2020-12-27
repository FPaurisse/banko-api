const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const guestSchema = new Schema({
    email: { type: String }
});

const categorySchema = new Schema({
    title: { type: String }
});

const operationSchema = new Schema({
    title: { type: String },
    categories: { type: Array },
    amount: { type: String },
    date: { type: String },
    isPassed: { type: Boolean },
    isCredit: { type: Boolean },
    userId: { type: String },
    accountId: { type: String }
});

const accountSchema = new Schema({
        title: { type: String },
        operations: [operationSchema],
        categories: [categorySchema],
        guests: [guestSchema]
    });

const settingsSchema = new Schema({
    primaryAccount: { type: String },
    shareMyProfile: { type: Boolean }
});

const profileSchema = new Schema({
        keycloakId: { type: String },
        firstname: { type: String },
        lastname: { type: String },
        fullname: { type: String },
        username: { type: String },
        email: { type: String },
        isConfirmed: { type: Boolean },
        settings: settingsSchema,
        accounts: [accountSchema],
    },
    {
        timestamps: true
    }
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
