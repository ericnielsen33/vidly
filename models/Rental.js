const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { customerSchema } = require("./Customer");
const { movieSchema } = require("./Movie");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    customer: {
        type: customerSchema,
        required: true
    },
    movie: {
        type: movieSchema,
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

function validateRental(rental) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    }
    return Joi.validate(rental, schema);
}

const Rental = mongoose.model('Rental', rentalSchema);
exports.Rental = Rental;
exports.validateRental = validateRental;