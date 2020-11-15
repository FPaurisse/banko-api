const { getUserId } = require('../../../utils');

const createOperation = async (parent, args, context) => {
    const userId = getUserId(context);
    const { models } = context;
    const newOperation = await models.Operation.create({ user: userId, ...args });
    if (!newOperation) {
        throw new Error('Create error');
    }
    context.pubsub.publish("NEW_OPERATION", newOperation);
    return newOperation
};

const updateOperation = async (parent, args, context) => {
    getUserId(context);
    const { _id, ...rest } = args;
    const { models } = context;
    const operation = await models.Operation.findByIdAndUpdate(_id, { ...rest }, { new: true });
    if (!operation) {
        throw new Error('Update error');
    }
    return operation;
};

const updateOperations = async (parent, args, context) => {
    getUserId(context)
    const { selected, ...rest } = args;
    const { models } = context;
    const operation = await models.Operation.updateMany({ _id: { $in: selected } }, { ...rest });
    if (!operation) {
        throw new Error('Update error');
    }
    return {
        selected: selected,
        ...rest
    }
};

const deleteOperation = async (parent, args, context) => {
    getUserId(context)
    const { _id } = args;
    const { models } = context;
    const operation = await models.Operation.findByIdAndRemove(_id);
    if (!operation) {
        throw new Error('Delete error');
    }
    return {
        _id: operation._id
    }
};

const deleteOperations = async (parent, args, context) => {
    getUserId(context)
    const { selected } = args;
    const { models } = context;
    const operation = await models.Operation.deleteMany({ _id: { $in: selected } });
    if (!operation) {
        throw new Error('Delete error');
    }
    return {
        selected: selected
    }
};

module.exports = { 
    createOperation, updateOperation, deleteOperation, deleteOperations, updateOperations
}