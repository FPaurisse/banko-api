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
    resolve: async function (root, param) {
        const { _id, ...rest } = param;
        const operation = await Operation.findByIdAndUpdate(_id, rest, { new: true });
        if (!operation) {
            throw new Error('Error')
        }
        return operation;
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
        const operation = await Operation.findByIdAndRemove(param._id)
        if (!operation) {
            throw new Error('Error');
        }
        return operation
    }
};

module.exports = { addOperation, updateOperation, removeOperation };
