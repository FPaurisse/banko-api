const moment = require('moment');

const getOperationsByPeriod = async (parent, args, context) => {
    const { month, year, accountId } = args;
    const { models } = context;

    const operations = await models.Operation.find({ accountId }).sort({ 'date': -1 });
    const operationsByPeriod = operations.filter(x => moment(new Date(x.date)).format('MM') === month && moment(new Date(x.date)).format('YYYY') === year);

    return [...operationsByPeriod];
};

const getOperationsToCalculate = async (parent, args, context) => {
    const { month, year, accountId } = args;
    const { models, kauth } = context;

    const operations = await models.Operation.find({ accountId  });
    const operationsToCalculate = operations.filter(x => (moment(new Date(x.date)).isBefore(moment(new Date(year, month)).format('YYYY-MM-DD'))));
    
    return [...operationsToCalculate];
};

const getOperation = async (parent, args, context) => {
    const { _id } = args;
    const { models } = context;
    const operation = await models.Operation.findById(_id);
    if (!operation) {
        throw new Error('Operation not found')
    }
    return operation;
};

module.exports = { 
    getOperation, getOperationsByPeriod, getOperationsToCalculate
}