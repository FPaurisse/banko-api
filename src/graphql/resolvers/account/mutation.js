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
    const Account = await models.Account.findByIdAndUpdate(_id, { isDefault, ...rest }, { new: true });
    if (!Account) {
        throw new Error('Update error');
    }
    return Account;
};

const deleteAccount = async (parent, args, context) => {
    const { _id } = args;
    const { models } = context;
    const Account = await models.Account.findByIdAndRemove(_id);
    if (!Account) {
        throw new Error('Delete error');
    }
    return {
        _id: Account._id
    }
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