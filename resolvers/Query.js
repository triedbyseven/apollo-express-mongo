const { User, Movie } = require('../models');

// Query Resolvers

// Return all users
getAllUsers = async (_, args, { email }) => {
  // Verify user (by email)
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
  // Verify user (by email)
  if (!email) throw new Error('Not Authenticated');

  return await Movie.find({ userId: id }).exec();
};

module.exports = {
  getAllUsers,
  getAllMovies
};
