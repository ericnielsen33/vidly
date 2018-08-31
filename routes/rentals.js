const express = require("express");
const auth = require("../middleware/auth");
const rentals_controller = require("../controllers/rentals_controller");
const router = express.Router();

router.get("/", auth, rentals_controller.getAllRentals);
router.post("/", auth, rentals_controller.createRental);
router.get("/:id", auth, rentals_controller.findRentalById);
router.put("/:id", auth, rentals_controller.updateRental);
router.delete("/:id", auth, rentals_controller.removeRental);

module.exports = router;
