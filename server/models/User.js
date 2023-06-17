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
  phonenumber: {
    type: String,
    required: true,
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
  othername: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
