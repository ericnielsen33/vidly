const express = require("express");
const error = require("../middleware/error");
const genres = require("./genres");
const customers = require("./customers");
const movies = require("./movies");
const rentals = require("./rentals");
const users = require("./users");
const auth = require("./auth");

module.exports = function (app) {
    app.use(express.json());
    app.use("/api/auth", auth);
    app.use("/api/users", users);
    app.use("/api/genres", genres);
    app.use("/api/customers", customers);
    app.use("/api/movies", movies);
    app.use("/api/rentals", rentals);
    app.use(error);
}