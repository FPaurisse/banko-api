const userQuery = require('./user/query');
const userMutation = require('./user/mutation');

const operationQuery = require('./operation/query');
const operationMutation = require('./operation/mutation');
const operationSubcription = require('./operation/subscription');

const query = { ...userQuery, ...operationQuery };
const mutation = { ...userMutation, ...operationMutation };
const subscription = { ...operationSubcription };

module.exports = { 
    query, mutation, subscription
}