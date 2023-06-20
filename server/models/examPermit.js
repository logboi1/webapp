const mongoose = require("mongoose");

const examPermitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  documentId: {
    type: String,
    required: true,
  },
  seatNumber: {
    type: String,
    required: true,
    unique: true,
  },
  // Other exam permit fields
});

const ExamPermit = mongoose.model("ExamPermit", examPermitSchema);

module.exports = ExamPermit;
