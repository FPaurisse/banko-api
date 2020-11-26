const operationQuery = require('./operation/query');
const operationMutation = require('./operation/mutation');

const query = { ...operationQuery };
const mutation = { ...operationMutation };

module.exports = { 
    query, mutation
}