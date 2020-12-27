const createSetting = async (parent, args, context) => {
    const { ...rest } = args;
    const { models } = context;
    const newSetting = await models.Setting.create({ ...rest });
    if (!newSetting) {
        throw new Error('Create error');
    }
    return newSetting
};

const updateSetting = async (parent, args, context) => {
    const { userId, ...rest } = args;
    const { models } = context;
    const setting = await models.Setting.findOneAndUpdate({ userId: userId }, { ...rest }, { new: true });
    if (!setting) {
        throw new Error('Update error');
    }
    return setting;
};

const deleteSetting = async (parent, args, context) => {
    const { userId } = args;
    const { models } = context;
    const setting = await models.Setting.findOneAndRemove({ userId: userId });
    if (!setting) {
        throw new Error('Delete error');
    }
    return setting;
};

const deleteAllSettings = async (parent, args, context) => {
    const { models } = context;
    const settings = await models.Setting.deleteMany();
    if (!settings) {
        throw new Error('Delete error');
    }
    return true
};

module.exports = { 
    createSetting, updateSetting, deleteSetting, deleteAllSettings
}