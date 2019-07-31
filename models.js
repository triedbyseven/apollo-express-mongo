const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: String,
  email: String,
  password: String
});

const tagSchema = new Schema({
  name: String
});

const User = mongoose.model('user', userSchema);
const Tags = mongoose.model('tags', tagSchema);

module.exports = {
  User
};
