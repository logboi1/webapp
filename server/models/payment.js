const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  referencId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
  },
  section: {
    type: String,
  },
  semester: {
    type: String,
  },
  level: {
    type: String,
  },
  date: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "Approved"],
    default: "pending",
  },
  // Other payment fields
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
