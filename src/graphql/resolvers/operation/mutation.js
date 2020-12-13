const createOperation = async (parent, args, context) => {
    const { models, kauth } = context;
    const newOperation = await models.Operation.create({ ...args });
    if (!newOperation) {
        throw new Error('Create error');
    }
    return newOperation
};

const updateOperation = async (parent, args, context) => {
    const { _id, ...rest } = args;
    const { models } = context;
    const operation = await models.Operation.findByIdAndUpdate(_id, { ...rest }, { new: true });
    if (!operation) {
        throw new Error('Update error');
    }
    return operation;
};

const updateOperations = async (parent, args, context) => {
    const { selected, isPassed } = args;
    const { models } = context;
    const operations = await models.Operation.updateMany({ _id: { $in: selected } }, { isPassed });
    if (!operations) {
        throw new Error('Update error');
    }
    return { selected }
};

const deleteOperation = async (parent, args, context) => {
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