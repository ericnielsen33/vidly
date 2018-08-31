const express = require('express');
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const genreController = require("../controllers/genre_controller");
const router = express.Router();

router.get("/", asyncMiddleware(genreController.findAllGenres));
router.post('/', auth, asyncMiddleware(genreController.create));
router.put("/:id", [auth, isAdmin], asyncMiddleware(genreController.updateGenre));
router.delete("/:id", [auth, isAdmin], asyncMiddleware(genreController.removeGenreByID));
router.get("/:id", asyncMiddleware(genreController.findGenreByID));

module.exports = router;