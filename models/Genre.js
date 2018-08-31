const mongoose = require('mongoose');
const joi = require("joi");
const Schema = mongoose.Schema;

function validateGenre(genre) {
    const schema = {
        name: joi.string().min(4).max(50).required(),
    };
    const {err} = joi.validate(customer, schema);
    return !!err;
}

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
    validator: {
      validateGenre,
      msg: "The genre in invalid"
    }
  }
});

const Genre = mongoose.model('Genre', GenreSchema);
exports.Genre = Genre;
exports.GenreSchema = GenreSchema;
