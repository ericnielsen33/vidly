const express = require('express');
const auth = require("../middleware/auth");
const movies_controller = require("../controllers/movies_controller");
const router = express.Router();

router.get("/", movies_controller.getAllMovies);
router.post("/", auth, movies_controller.createMovie);
router.get("/:id", movies_controller.findMovieById);
router.put("/:id", auth, movies_controller.updateMovie);
router.delete("/:id", auth, movies_controller.removeMovie);

module.exports = router;