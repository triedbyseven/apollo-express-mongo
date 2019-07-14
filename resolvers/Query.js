const { User } = require('../models');

// Query Resolvers

// Return all users
getAllUsers = async () => await User.find({}).exec();

module.exports = {
  getAllUsers
};
