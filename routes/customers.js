const express = require("express");
const auth = require("../middleware/auth");

const isAdmin = require("../middleware/isAdmin");
const CustomerController = require("../controllers/customer_controller");
const router = express.Router();

router.get("/", auth, CustomerController.getAllCustomers);
router.post("/", auth, CustomerController.createCustomer);
router.get("/:id", auth, CustomerController.getCustomerById);
router.put("/:id", auth, CustomerController.updateCustomer);
router.delete("/:id", [auth, isAdmin], CustomerController.deleteCustomer);
module.exports = router;
