const { User } = require('../models');

// Mutation Resolvers

// Add a user
addUser = async (_, { id, userName, email, password }) => {
  try {
    let user = await User.findOne({ email: email });
    if (user) throw new Error(`${email} has already been registered`);

    user = await User.create({ id, userName, email, password });

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

module.exports = {
  addUser,
  deleteUser
};
