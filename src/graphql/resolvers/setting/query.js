const getSettingByUser = async (parent, args, context) => {
    const { userId } = args;
    const { models } = context;
    const setting = await models.Setting.findOne({ userId });
    if (!setting) {
        throw new Error('setting not found')
    }
    return setting;
};

module.exports = { 
    getSettingByUser
}