const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  surname: {
    type: String,
    required: true,
  },
  matricNumber: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  otherName: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  schoolName: {
    type: String,
  },
  address: {
    type: String,
  },
});

const User = mongoose.model("Students", userSchema);

module.exports = User;
