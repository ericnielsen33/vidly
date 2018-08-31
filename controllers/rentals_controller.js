const Fawn = require('fawn');
const { Rental, validateRental } = require("../models/Rental");
const { Movie } = require("../models/Movie");
const { Customer } = require("../models/Customer");

module.exports = {
  async getAllRentals(req, res) {
    const rentals = await Rental.find();
    if(!rentals) return res.status(400).send("good luck with your rental");
    res.send(rentals);
  },
  async createRental(req, res) {
    const { error } = validateRental(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("Invalid customer");
    let movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send("Invalid movie");
    if (movie.numberInStock === 0) return res.status(400).send("Movie not in stock");
    let rental = new Rental({
      customer: customer,
      movie: movie,
      dateOut: req.body.dateOut,
      dateReturned: req.body.dateReturned,
      rentalFee: req.body.rentalFee
    });

    try {
      new Fawn.Task()
        .save('rentals', rental)
        .update('movies', {_id: movie._id }, {
          $inc: { numberInStock: -1 }
        })
        .run()
      res.send(rental);
    } catch (error) {
      console.log(error);
      res.status(500).send("Faild to complete rental transaction");
    }
  },
  async findRentalById(req, res) {},
  async updateRental(req, res) {},
  async removeRental(req, res) {}
};
