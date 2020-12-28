const getAccountsByUser = async (parent, args, context) => {
    const { userId } = args;
    const { models } = context;
    const accounts = await models.Account.find({ $or: [{ userId }, { guests: { $in: userId } }] });
    if (!accounts) {
        throw new Error('Accounts not found')
    }

    return accounts.map((account) => {
        const guestAccount = account.userId !== userId;
        return (
            {
                _id: account.id,
                userId: account.userId,
                guests: account.guests,
                title: `${account.title} ${guestAccount ? '(invité)' : ''}`,
                guestAccount: guestAccount ? true : false
            }
        )
    });
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