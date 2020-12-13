const createAccount = async (parent, args, context) => {
    const { isDefault, ...rest } = args;
    const { models } = context;
    if (isDefault) {
        const accounts = await models.Account.updateMany({isDefault: true}, {$set:{isDefault: false}});
        if (!accounts) {
            throw new Error('Update error');
        }
    }
    const newAccount = await models.Account.create({ isDefault, ...rest });
    if (!newAccount) {
        throw new Error('Create error');
    }
    return newAccount
};

const updateAccount = async (parent, args, context) => {
    const { _id, isDefault, ...rest } = args;
    const { models } = context;
    if (isDefault) {
        const accounts = await models.Account.updateMany({isDefault: true}, {$set:{isDefault: false}});
        if (!accounts) {
            throw new Error('Update error');
        }
    }
    const account = await models.Account.findByIdAndUpdate(_id, { isDefault, ...rest }, { new: true });
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
    return account
};

const deleteAccounts = async (parent, args, context) => {
    const { models } = context;
    const accounts   = await models.Account.deleteMany();
    await models.Operations.deleteMany();
    if (!accounts) {
        throw new Error('Delete error');
    }
};

module.exports = { 
    createAccount, updateAccount, deleteAccount, deleteAccounts
}