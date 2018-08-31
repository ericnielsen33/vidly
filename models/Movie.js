const mongoose = require('mongoose');
const { GenreSchema } = require("./Genre");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255
  },
  genre: {
    type: GenreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    min: 0,
    default: 0
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    default: 0
  }
});

const Movie = mongoose.model('Movies', movieSchema);
exports.Movie = Movie;
exports.movieSchema = movieSchema;