const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
});

const movieSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  genre: String,
  releaseDate: String
});

const User = mongoose.model('User', userSchema);
const Movie = mongoose.model('Movie', movieSchema);

module.exports = {
  User,
  Movie
  // Tag
};
