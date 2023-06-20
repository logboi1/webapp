const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  name: {
    type: String,
  },
  file: {
    type: String,
  },
  approved: {
    type: Boolean,
  },
  // Other receipt fields
});

const Receipt = mongoose.model("Receipt", receiptSchema);

module.exports = Receipt;
