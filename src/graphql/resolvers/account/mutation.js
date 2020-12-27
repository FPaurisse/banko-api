const createAccount = async (parent, args, context) => {
    const { ...rest } = args;
    const { models } = context;
    const newAccount = await models.Account.create({ ...rest });
    if (!newAccount) {
        throw new Error('Create error');
    }
    return newAccount
};

const updateAccount = async (parent, args, context) => {
    const { _id, ...rest } = args;
    const { models } = context;
    const account = await models.Account.findByIdAndUpdate(_id, { ...rest }, { new: true });
    if (!account) {
        throw new Error('Update error');
    }
    return account;
};

const deleteAccount = async (parent, args, context) => {
    const { _id } = args;
    const { models } = context;
    const account = await models.Account.findByIdAndRemove(_id);
    if (!account) {
        throw new Error('Delete error');
    }
    await models.Operation.deleteMany(
        { accountId: _id }
    );
    await models.Category.deleteMany(
        { accountId: _id }
    );
    return account
};

const deleteAllAccounts = async (parent, args, context) => {
    const { models } = context;
    const accounts = await models.Account.deleteMany();
    if (!accounts) {
        throw new Error('Delete error');
    }
    return true
};

module.exports = { 
    createAccount, updateAccount, deleteAccount, deleteAllAccounts
}