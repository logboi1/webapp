const Payment = require("../models/payment");

// Controller function to handle making a payment for a student
const makePayment = async (req, res) => {
  try {
    // Extract student ID, amount, and date from the request body
    const { userId, amount, date, status } = req.body;

    // Create a new payment instance
    const payment = new Payment({
      userId,
      amount,
      date,
      status,
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

// Export the controller functions
module.exports = {
  makePayment,
  getPaymentsByStudent,
};
