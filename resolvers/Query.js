const { User, Movie } = require('../models');
const jwt = require('jsonwebtoken');

// Query Resolvers

// Return all users
getAllUsers = async (_, args, { email }) => {
  // Verify user is logged in.
  if (!email) throw new Error('Not Authenticated');

  try {
    const response = await User.find()
      .populate('movies')
      .exec();

    return response;
  } catch (err) {
    return err;
  }
};

// Return all user movies
getAllMovies = async (_, args, { id, email }) => {
  // Verify user is logged in.
  if (!email) throw new Error('Not Authenticated.');

  return await Movie.find({ userId: id }).exec();
};

module.exports = {
  getAllUsers,
  getAllMovies
};
