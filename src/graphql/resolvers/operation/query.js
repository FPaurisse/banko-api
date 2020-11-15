const moment = require('moment');
const { getUserId } = require('../../../utils');

const getOperationsByPeriod = async (parent, args, context) => {
    const userId = getUserId(context);
    const { month, year } = args;
    const { models } = context;
    const operations = await models.Operation.find({ user: userId }).sort({ 'date': -1 }).populate('user');
    const operationsByPeriod = operations.filter(x => moment(new Date(x.date)).format('MM') === month && moment(new Date(x.date)).format('YYYY') === year);
    return operationsByPeriod;
};

const getOperationsToCalculate = async (parent, args, context) => {
    const userId = getUserId(context)
    const { month, year } = args;
    const { models } = context;
    const operations = await models.Operation.find({ user: userId });
    const operationsToCalculate = operations.filter(x => (moment(new Date(x.date)).isBefore(moment(new Date(year, month)).format('YYYY-MM-DD'))));
    return operationsToCalculate;
};

const getOperation = async (parent, args, context) => {
    getUserId(context)
    const { _id } = args;
    const { models } = context;
    const operation = await models.Operation.findById(_id).populate('user');
    if (!operation) {
        throw new Error('Operation not found')
    }
    return operation;
};

module.exports = { 
    getOperation, getOperationsByPeriod, getOperationsToCalculate
}