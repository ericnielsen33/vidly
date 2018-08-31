const logger = require("../startup/winston");

module.exports = function (err, req, res, next) {
    logger.log('error', err.message);
    res.status(500).send("Unhandled Exception");
}