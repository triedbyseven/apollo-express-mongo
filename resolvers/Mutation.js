const { User } = require('../models');

// Mutation Resolvers

// Add a user
addUser = async (_, args) => {
  try {
    let user = await User.findOne({ email: args.email });
    if (user) throw new Error(`${args.email} has already been registered`);

    user = await User.create(args);

    console.log(user);

    return user;
  } catch (e) {
    return e;
  }
};

// Delete a user
deleteUser = async (_, args) => {
  try {
    let user = await User.findOne({ email: args.email });
    if (!user) throw new Error(`${args.email} doesn't exist.`);

    user = await User.findOneAndDelete({ email: args.email });

    return user;
  } catch (e) {
    return e;
  }
};

module.exports = {
  addUser,
  deleteUser
};
