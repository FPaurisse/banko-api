const getAccountsByUser = async (parent, args, context) => {
    const { userId } = args;
    const { models, kauth } = context;
    const accounts = await models.Account.find({ userId });
    return accounts;
};

const getAccount = async (parent, args, context) => {
    const { _id } = args;
    const { models } = context;
    const account = await models.Account.findById(_id);
    if (!account) {
        throw new Error('Account not found')
    }
    return account;
};

module.exports = { 
    getAccount, getAccountsByUser
}