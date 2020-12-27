const reset = async (parent, args, context) => {
    const { models } = context;
    try {
        await models.Account.deleteMany();
        await models.Operation.deleteMany();
        await models.Profile.deleteMany();
        await models.Category.deleteMany();
        return true
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = { 
    reset
}