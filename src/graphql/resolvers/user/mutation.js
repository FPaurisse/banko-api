const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserId, APP_SECRET } = require('../../../utils');

const signup = async (parent, args, context, info) => {
    const { password, ...rest } = args;
    const { models } = context;
    const hashPassword = await bcrypt.hash(password, 10);
    const OperationModel = new models.User({ ...rest, password: hashPassword });
    const user = await OperationModel.save();
    const token = jwt.sign({ userId: user._id }, APP_SECRET);
    return { token, user };
  }
  
 const login = async (parent, args, context, info) => {
    const { email, password } = args;
    const { models } = context;
     const user = await models.User.findOne({ email });
    if (!user) {
        throw new Error('No such user found');
    }
     const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw new Error('Invalid password');
    }
    const operationsByUser = await models.Operation.find({ user: user._id });
     if (operationsByUser) {
         user.operations = operationsByUser
    } 
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return { token, user };
  }
  
module.exports = { 
    signup,
    login
}