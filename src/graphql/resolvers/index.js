const operationQuery = require('./operation/query');
const operationMutation = require('./operation/mutation');

const categoryQuery = require('./category/query');
const categoryMutation = require('./category/mutation');

const accountQuery = require('./account/query');
const accountMutation = require('./account/mutation');

const query = { ...operationQuery, ...categoryQuery, ...accountQuery };
const mutation = { ...operationMutation, ...categoryMutation,...accountMutation };

module.exports = { 
    query, mutation
}