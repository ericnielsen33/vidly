const { Genre } = require("../models/Genre");
const { Movie } = require("../models/Movie");

module.exports = {
  async getAllMovies(req, res) {
    try {
      const movies = await Movie.find({});
      res.send(movies);
    } catch (error) {
      console.log(error);
      res.status(400).send("Please try again later");
    }
  },
  async createMovie(req, res) {
    try {
      const genre = await Genre.findById(req.body.genreId);
      if (!genre) return res.status(400).send("Invaid Genre");
      let movie = new Movie({
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
      });
      movie = await movie.save();
      res.send(movie);
    } catch (error) {
      console.log(error);
    }
  },
  async findMovieById(req, res) {
    try {
      const movie = await Movie.findById(req.params.id);
      res.send(movie);
    } catch (error) {
      res.status(400).send("invalid movie");
    }
  },
  async removeMovie(req, res) {
    try {
      const movie = await Movie.findByIdAndRemove(req.params.id);
      res.send(movie);
    } catch (error) {
      console.log(error);
      res.status(400).send("invalid movie");
    }
  },
  async updateMovie(req, res) {
    const { id } = req.params;
    const newGenre = req.body.genreId;
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invaid Genre");
    let movie = await Movie.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
      },
      { new: true }
    );
    if (!movie) return res.status(404).send("invalid movie");
    res.send(movie);
  }
};
