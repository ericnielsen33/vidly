const express = require("express");
const auth_controller = require("../controllers/auth_controller");
const router = express.Router();

// router.get("/", );
router.post("/", auth_controller.loginUser);
// router.get("/:id", movies_controller.findMovieById);
// router.put("/:id", movies_controller.updateMovie);
// router.delete("/:id", movies_controller.removeMovie);

module.exports = router;
