const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
        userId: { type: String, required: true },
        accountIdByDefault: { type: String },
        shareMyProfile: { type: Boolean },
        email: { type: String },
        username: { type: String },
        firstname: { type: String },
        lastname: { type: String }  
    },
    {
        timestamps: true
    }
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
