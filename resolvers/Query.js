const { User } = require('../models');

// Query Resolvers

// Return all users
getAllUsers = async (_, args, { email }) => {
  // Verify user (by email)
  if (!email) throw new Error('Not Authenticated');

  return await User.find({}).exec();
};

module.exports = {
  getAllUsers
};
