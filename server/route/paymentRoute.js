const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

// Payment Routes
router.post("/payments", paymentController.makePayment);
router.get("/payments/:id", paymentController.getPaymentsByStudent);

module.exports = router;
