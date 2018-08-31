const express = require("express");
const auth = require("../middleware/auth");
const user_controller = require("../controllers/user_controller");
const router = express.Router();

router.post("/", user_controller.createUser);
router.get("/me", auth, user_controller.getCurrentUser);
// router.put("/:id", user_controller.updateUserProperties);
// router.delete("/:id", user_controller.removeUser);

module.exports = router;
