const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  amount: {
    type: Number,
  },
  date: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
  // Other payment fields
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
