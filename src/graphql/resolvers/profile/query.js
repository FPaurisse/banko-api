const { find } = require("lodash");

const getProfile = async (parent, args, context) => {
    const { _id } = args;
    const { models } = context;
    const profile = await models.Profile.findById(_id);
    if (!profile) {
        throw new Error('Profile not found')
    }
    return profile;
};

module.exports = {
    getProfile
}