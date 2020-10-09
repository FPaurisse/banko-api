const {GraphQLNonNull, GraphQLString, GraphQLBoolean} = require('graphql');
const OperationType = require('../queries/OperationType');
const Operation = require('../../models/Operation')

const addOperation = {
    type: OperationType,
    args: {
        title: {
            name: 'title',
            type: new GraphQLNonNull(GraphQLString)
        },
        amount: {
            name: 'amount',
            type: new GraphQLNonNull(GraphQLString)
        },
        date: {
            name: 'date',
            type: new GraphQLNonNull(GraphQLString)
        },
        isPassed: {
            name: 'isPassed',
            type: new GraphQLNonNull(GraphQLBoolean)
        },
        isCredit: {
            name: 'isCredit',
            type: new GraphQLNonNull(GraphQLBoolean)
        }
    },
    resolve: async function (root, params) {
        const OperationModel = new Operation(params);
        const newOperation = await OperationModel.save();
        if (!newOperation) {
            throw new Error('Error')
        }
        return newOperation
    }
};

const updateOperation = {
    type: OperationType,
    args: {
        _id: {
            name: '_id',
            type: new GraphQLNonNull(GraphQLString)
        },
        title: {
            name: 'title',
            type: GraphQLString
        },
        amount: {
            name: 'amount',
            type: GraphQLString
        },
        date: {
            name: 'date',
            type: GraphQLString
        },
        isPassed: {
            name: 'isPassed',
            type: GraphQLBoolean
        },
        isCredit: {
            name: 'isCredit',
            type: GraphQLBoolean
        }
    },
    resolve: async function (root, param) {
        let updateOperation = {};
        if (param.title) {
            updateOperation.name = param.title
        }
        if (param.amount) {
            updateOperation.amount = param.amount
        }
        if (param.date) {
            updateOperation.date = param.date
        }
        if (param.isPassed) {
            updateOperation.isPassed = param.isPassed
        }
        if (param.isCredit) {
            updateOperation.isCredit = param.isCredit
        }
        const Operation = await Operation.findByIdAndUpdate(param._id, updateOperation, { new: true })
        if (!Operation) {
            throw new Error('Error')
        }
        return Operation
    }
};

const removeOperation = {
    type: OperationType,
    args: {
        _id: {
            name: '_id',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function (root, param) {
        const removeOperation = await Operation.findByIdAndRemove(param._id)
        if (!removeOperation) {
            throw new Error('Error');
        }
        return removeOperation
    }
};

module.exports = { addOperation, updateOperation, removeOperation };
