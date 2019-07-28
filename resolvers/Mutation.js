const { User } = require('../models');

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

module.exports = {
  addUser,
  updateUser,
  deleteUser
};
