const { find } = require("lodash");

const createProfile = async (parent, args, context) => {
    const { models } = context;
    const newProfile = await models.Profile.create({ ...args });
    if (!newProfile) {
        throw new Error('Create error');
    }
    return newProfile
};

const updateProfile = async (parent, args, context) => {
    const { _id, ...rest } = args;
    const { models } = context;
    const profile = await models.Profile.findByIdAndUpdate(_id, { ...rest }, { new: true });
    if (!profile) {
        throw new Error('Update error');
    }
    return profile;
};

const deleteProfile = async (parent, args, context) => {
    const { _id } = args;
    const { models } = context;
    const profile = await models.Profile.findByIdAndRemove(_id);
    if (!profile) {
        throw new Error('Delete error');
    }
    return {
        _id: profile._id
    }
};

// ACCOUNT 

const createAccountBis = async (parent, args, context) => {
    const { profileId, title } = args;
    const { models } = context;
    
    await models.Profile.updateOne(
        { _id: profileId }, 
        { $push: { accounts: { title } } }
    );
    
    const updatedProfile = await models.Profile.findById(profileId);
    if (!updatedProfile) {
        throw new Error('Updated profil error');
    }
    return updatedProfile
};

const updateAccountBis = async (parent, args, context) => {
    const { profileId, accountId, title } = args;
    const { models } = context;
    
    await models.Profile.updateOne(
        { _id: profileId },
        { $set: { 'accounts.$[a].title': title } },
        { arrayFilters: [{ "a._id": accountId }] }
    );

    const updatedProfile = await models.Profile.findById(profileId);
    if (!updatedProfile) {
        throw new Error('Updated profil error');
    }
    return updatedProfile
};

const deleteAccountBis = async (parent, args, context) => {
    const { profileId, accountId } = args;
    const { models } = context;
    
    await models.Profile.updateOne(
        { _id: profileId }, 
        { $pull: { accounts: { _id: accountId } } }
    );

    const updatedProfile = await models.Profile.findById(profileId);
    if (!updatedProfile) {
        throw new Error('Updated profil error');
    }
    return updatedProfile
};

// OPERATION

const createOperationBis = async (parent, args, context) => {
    const { profileId, accountId, ...rest } = args;
    const { models } = context;
    
    await models.Profile.updateOne(
        {_id: profileId}, 
        { $push: {'accounts.$[a].operations': { ...rest }}},
        { arrayFilters: [{ "a._id": accountId }] }
    );
    
    const updatedProfile = await models.Profile.findById(profileId);
    if (!updatedProfile) {
        throw new Error('Updated profil error');
    }
    return updatedProfile
};

const updateOperationBis = async (parent, args, context) => {
    const { profileId, accountId, operationId, ...rest } = args;
    const { models } = context;

    await models.Profile.updateOne(
        { _id: profileId }, 
        { $set: { "accounts.$[a].operations.$[o]": { ...rest } } },
        { arrayFilters: [{ "a._id": accountId }, { "o._id": operationId }] },
        { upsert: true, new: true }
    );

    const updatedProfile = await models.Profile.findById(profileId);
    if (!updatedProfile) {
        throw new Error('Updated profil error');
    }
    return updatedProfile
};

const deleteOperationBis = async (parent, args, context) => {
    const { profileId, accountId, operationId } = args;
    const { models } = context;
    
    await models.Profile.updateOne(
        { _id: profileId }, 
        { $pull: { "accounts.$[a].operations": { _id: operationId } } },
        { arrayFilters: [{ "a._id": accountId }]}
    );

    const updatedProfile = await models.Profile.findById(profileId);
    if (!updatedProfile) {
        throw new Error('Updated profil error');
    }
    return updatedProfile
};

module.exports = { 
    createProfile,
    createOperationBis,
    updateOperationBis,
    deleteOperationBis,
    createAccountBis,
    updateAccountBis,
    deleteAccountBis,
    updateProfile, 
    deleteProfile
}