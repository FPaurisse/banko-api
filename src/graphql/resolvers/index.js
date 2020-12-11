const operationQuery = require('./operation/query');
const operationMutation = require('./operation/mutation');

const accountQuery = require('./account/query');
const accountMutation = require('./account/mutation');

const query = { ...operationQuery, ...accountQuery };
const mutation = { ...operationMutation, ...accountMutation };

module.exports = { 
    query, mutation
}