const operationQuery = require('./operation/query');
const operationMutation = require('./operation/mutation');

const categoryQuery = require('./category/query');
const categoryMutation = require('./category/mutation');

const accountQuery = require('./account/query');
const accountMutation = require('./account/mutation');

const settingQuery = require('./setting/query');
const settingMutation = require('./setting/mutation');

const profileQuery = require('./profile/query');
const profileMutation = require('./profile/mutation');

const reset = require('./reset/mutation');

const query = { ...operationQuery, ...categoryQuery, ...accountQuery, ...settingQuery, ...profileQuery };
const mutation = { ...operationMutation, ...categoryMutation, ...accountMutation, ...settingMutation, ...profileMutation, ...reset };

module.exports = { 
    query, mutation
}