const { getUserId } = require('../../../utils');

const getUser = async (parent, args, context) => {
    const userId = getUserId(context)
    const { models } = context;
    const operationsByUser = await models.Operation.find({ user: userId });
    const user = await models.User.findById(userId);
    if (!user) {
        throw new Error('Error')
    }
    if (operationsByUser) {
        user.operations = operationsByUser;
    }
    return user;
};

module.exports = { 
    getUser
}