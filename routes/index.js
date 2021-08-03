const express = require("express");
const router = express.Router();
const check_Auth = require("../config/auth");

const UserController = require("../controller/user");
const InvoiceController = require("../controller/Invoice");

// Routes for User
router.post("/signin", UserController.signin);
router.post("/login", UserController.login);
router.get("/user", UserController.getUsers);
// router.post("/invoice", InvoiceController.generateinvoice);

module.exports = router;
