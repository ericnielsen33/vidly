const mongoose = require("mongoose");
const Fawn = require("fawn");
const logger = require("./winston");

module.exports = function () {
    mongoose.Promise = global.Promise;
    mongoose
        .connect("mongodb://localhost/vidly")
        .then(() => logger.info("Connected to MongoDB"));
    Fawn.init(mongoose);
}
