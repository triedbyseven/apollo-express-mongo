const { User, Movie } = require('../models');
const jwt = require('jsonwebtoken');

// Mutation Resolvers

// Add & register a user
addUser = async (_, { userName, email, password }) => {
  try {
    let user = await User.findOne({ email: email });
    if (user) throw new Error(`${email} has already been registered`);

    user = await User.create({ userName, email, password });

    const token = await jwt.sign({ id: user._id, email: user.email }, '123456');

    return { user, token };
  } catch (e) {
    return e;
  }
};

// Update a user (email)
updateUser = async (_, { id, email }) => {
  try {
    let user = await User.findOne({ _id: id });
    if (!user) throw new Error('This user does not exist!');

    user = await User.findOneAndUpdate({ _id: id }, { email: email });

    return user;
  } catch (e) {
    return e;
  }
};

// Delete a user
deleteUser = async (_, { email }) => {
  try {
    let user = await User.findOne({ email });
    if (!user) throw new Error(`${email} doesn't exist.`);

    user = await User.findOneAndDelete({ email });

    return user;
  } catch (e) {
    return e;
  }
};

// Add a movie
addMovie = async (_, { userId, title, genre, releaseDate }, { email }) => {
  // Find current User
  const user = await User.findOne({ email: email });

  // Create a Movie
  const movie = await Movie.create({ userId, title, genre, releaseDate });

  // Push our movie to the user in movies array.
  user.movies.push(movie);

  // Save Movie
  user.save();

  return movie;
};

// Delete a movie
deleteMovie = async (_, { id }) => {
  try {
    const movie = await Movie.findOneAndDelete({ _id: id });

    return movie;
  } catch (error) {
    return error;
  }
};

module.exports = {
  addUser,
  addMovie,
  updateUser,
  deleteUser,
  deleteMovie
};
