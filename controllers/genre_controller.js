const { Genre } = require("../models/Genre");

module.exports = {
  async findAllGenres(req, res) {
    const genres = await Genre.find();
    res.send(genres);
  },
  async findGenreByID(req, res) {
    const genre = await Genre.findOne({ _id: req.params.id });
    res.send(genre);
  },
  async create(req, res) {
    let newGenre = new Genre({ name: req.body.name });
    newGenre = await newGenre.save();
    res.send(newGenre);
  },
  async removeGenreByID(req, res) {
    const genre = await Genre.findOneAndRemove({ _id: req.params.id });
    res.send(genre);
  },
  async updateGenre(req, res) {
    let genre = await Genre.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.name },
      { new: true }
    );
    res.send(genre);
  }
};
