const createOperation = async (parent, args, context) => {
    const { models, kauth } = context;
    const { isCredit, amount, ...rest } = args;
    
    let formattedAmount = amount;
    if (!isCredit) {
        formattedAmount = `-${amount}`;   
    }

    const newOperation = await models.Operation.create({ isCredit, amount: formattedAmount, ...rest });
    if (!newOperation) {
        throw new Error('Create error');
    }
    return newOperation
};

const updateOperation = async (parent, args, context) => {
    const { _id, isCredit, amount, ...rest } = args;
    const { models } = context;
    
    let formattedAmount = amount;
    if (!isCredit) {
        formattedAmount = `-${amount}`;   
    }

    const operation = await models.Operation.findByIdAndUpdate(_id, { isCredit, amount: formattedAmount, ...rest }, { new: true });
    if (!operation) {
        throw new Error('Update error');
    }
    return operation;
};

const updateSelectedOperations = async (parent, args, context) => {
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

const deleteSelectedOperations = async (parent, args, context) => {
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

const deleteAllOperations = async (parent, args, context) => {
    const { models } = context;
    const operations = await models.Operation.deleteMany();
    if (!operations) {
        throw new Error('Delete error');
    }
    return true
};

module.exports = { 
    createOperation, updateOperation, updateSelectedOperations, deleteOperation, deleteSelectedOperations, deleteAllOperations
}