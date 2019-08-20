const jwt = require('jsonwebtoken');
const { User, Movie } = require('../models');
const { hashPassword } = require('../utils/hashPassword');
const { checkPassword } = require('../utils/checkPassword');

// Mutation Resolvers

// Log in user
loginUser = async (_, { userName, password: userPassword }) => {
  try {
    // Find user
    const user = await User.findOne({ userName: userName });

    // If user does not exist throw error.
    if (!user) throw new Error('This user has not been registered.');

    // Check password
    const password = await checkPassword(userPassword, user.password);
    if (!password) throw new Error('Your password is invalid!');

    // Create token
    const token = await jwt.sign({ id: user._id, email: user.email }, '123456');

    return { user, token };
  } catch (error) {
    return error;
  }
};

// Add & register a user
registerUser = async (_, { userName, email, password: userPassword }) => {
  try {
    // Check if user is already registered. If registered throw error.
    let user = await User.findOne({ email: email });
    if (user) throw new Error(`${email} has already been registered`);

    // Hash password
    const password = await hashPassword(userPassword);

    // Create new user
    user = await User.create({ userName, email, password });

    // Create token
    const token = await jwt.sign({ id: user._id, email: user.email }, '123456');

    return { user, token };
  } catch (e) {
    return e;
  }
};

// Update a user (email)
updateUser = async (_, { id, email }, { email: userEmail }) => {
  try {
    // Verify user is logged in.
    if (!userEmail) throw new Error('Not Authenticated.');

    // Find user or throw error
    let user = await User.findOne({ _id: id });
    if (!user) throw new Error('This user does not exist!');

    // Find user and update
    user = await User.findOneAndUpdate({ _id: id }, { email: email });

    return user;
  } catch (e) {
    return e;
  }
};

// Delete a user
deleteUser = async (_, { email }, { email: userEmail }) => {
  try {
    // Verify user is logged in
    if (!userEmail) throw new Error('Not Authenticated.');

    // Check if user exists. If no throw error.
    let user = await User.findOne({ email });
    if (!user) throw new Error(`${email} doesn't exist.`);

    // Find user and delete
    user = await User.findOneAndDelete({ email });

    return user;
  } catch (e) {
    return e;
  }
};

// Add a movie
addMovie = async (_, { userId, title, genre, releaseDate }, { email }) => {
  try {
    // Verify user is logged in.
    if (!email) throw new Error('Not Authenticated.');

    // Find current User
    const user = await User.findOne({ email: email });

    // Create a Movie
    const movie = await Movie.create({ userId, title, genre, releaseDate });

    // Push our movie to the user in movies array.
    user.movies.push(movie);

    // Save Movie
    user.save();

    return movie;
  } catch (error) {
    return error;
  }
};

// Delete a movie
deleteMovie = async (_, { id }, { email }) => {
  try {
    // Verify user is logged in.
    if (!email) throw new Error('Not Authenticated.');

    // Find and delete movie
    const movie = await Movie.findOneAndDelete({ _id: id });

    return movie;
  } catch (error) {
    return error;
  }
};

module.exports = {
  loginUser,
  registerUser,
  addMovie,
  updateUser,
  deleteUser,
  deleteMovie
};
