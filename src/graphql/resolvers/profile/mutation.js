const createProfile = async (parent, args, context) => {
    const { ...rest } = args;
    const { models } = context;
    const newProfile = await models.Profile.create({ ...rest });
    if (!newProfile) {
        throw new Error('Create error');
    }
    return newProfile
};

const updateProfile = async (parent, args, context) => {
    const { userId, ...rest } = args;
    const { models } = context;
    const profile = await models.Profile.findOneAndUpdate({ userId: userId }, { ...rest }, { new: true });
    if (!profile) {
        throw new Error('Update error');
    }
    return profile;
};

const deleteProfile = async (parent, args, context) => {
    const { userId } = args;
    const { models } = context;
    const profile = await models.Profile.findOneAndRemove({ userId: userId });
    if (!profile) {
        throw new Error('Delete error');
    }
    return profile;
};

const deleteAllProfiles = async (parent, args, context) => {
    const { models } = context;
    const profiles = await models.Profile.deleteMany();
    if (!profiles) {
        throw new Error('Delete error');
    }
    return true
};

module.exports = { 
    createProfile, updateProfile, deleteProfile, deleteAllProfiles
}