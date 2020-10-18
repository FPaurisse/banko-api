const { GraphQLList, GraphQLObjectType, GraphQLString } = require('graphql');
const moment = require('moment');
const Operation = require('../../models/Operation')
const OperationType = require('./OperationType')

const QueryRootType = new GraphQLObjectType ({
    name: 'AppSchema',
    fields: () => ({
        operationsByPeriod: {
            type: new GraphQLList(OperationType),
            args: {
                month: {type: GraphQLString},
                year: {type: GraphQLString}
            },
            resolve: async (_, { month, year }) => {
                const operations = await Operation.find({}).sort({ 'date': -1 })
                const operationsByPeriod = operations.filter(x => moment(x.date).format('MM') === month && moment(x.date).format('YYYY') === year)
                return operationsByPeriod;
            }
        },
        operationById: {
            type: OperationType,
            args: {
                _id: {type: GraphQLString}
            },
            resolve: async (_, { _id }) => {
                const operationById = await Operation.findById(_id);
                operationById.amount = operationById.amount.replace('-', '')
                return operationById;
            }
        },
        operationsToCalculate: {
            type: new GraphQLList(OperationType),
            args: {
                month: {type: GraphQLString},
                year: {type: GraphQLString}
            },
            resolve: async (_, { month, year }) => {
                const operations = await Operation.find({})
                const operationsToCalculate = operations.filter(x => (moment(x.date).format('MM') <= month) && (moment(x.date).format('YYYY') <= year));
                return operationsToCalculate;
            }
        },
    })
});

module.exports = QueryRootType
