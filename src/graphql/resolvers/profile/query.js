const getProfileByUserId = async (parent, args, context) => {
    const { userId } = args;
    const { models } = context;
    const profile = await models.Profile.findOne({ userId });
    if (!profile) {
        throw new Error('Profile not found')
    }
    return profile;
};

const getAllSharedProfiles = async (parent, args, context) => {
    const { userId } = args;
    const { models } = context;
    const profiles = await models.Profile.find(
        { shareMyProfile: true, userId: { $ne: userId }  },
    );
    if (!profiles) {
        throw new Error('Profiles not found')
    }
    return profiles;
};

module.exports = {
    getProfileByUserId,
    getAllSharedProfiles
}