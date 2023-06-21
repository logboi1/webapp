const Payment = require("../models/payment");

// Controller function to handle making a payment for a student
const makePayment = async (req, res) => {
  try {
    // Extract student ID, amount, and date from the request body
    const { userId, referencId, amount, date, status, section, level } =
      req.body;

    // Create a new payment instance
    const payment = new Payment({
      userId,
      amount,
      date,
      status,
      section,
      level,
      referencId,
    });

    // Save the payment to the database
    await payment.save();

    res.status(201).json({ message: "Payment made successfully" });
  } catch (error) {
    console.error("Error making payment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while making the payment" });
  }
};

// Controller function to get payments for a student
const getPaymentsByStudent = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the payments for the specified student ID
    const payments = await Payment.find({ userId });

    res.json(payments);
  } catch (error) {
    console.error("Error getting payments:", error);
    res
      .status(500)
      .json({ error: "An error occurred while getting the payments" });
  }
};

const getPaymentByLevel = async (req, res) => {
  try {
    const { userId, level } = req.body;

    // Find the payment for the specified user ID and level
    const payment = await Payment.findOne({ userId, level });

    if (payment) {
      // Payment found, return success response
      res.json({ message: "Payment found", payment });
    } else {
      // Payment not found, return error response
      res.status(404).json({ error: "Payment not found" });
    }
  } catch (error) {
    console.error("Error getting payment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while getting the payment" });
  }
};

// Export the controller functions
module.exports = {
  makePayment,
  getPaymentsByStudent,
  getPaymentByLevel,
};
