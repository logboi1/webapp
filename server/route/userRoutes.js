const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route for user registration
router.post("/register", async (req, res) => {
  try {
    const {
      email,
      surname,
      phonenumber,
      gender,
      department,
      level,
      othername,
      matricNo,
    } = req.body;
    const user = new User({
      email,
      surname,
      phonenumber,
      gender,
      department,
      level,
      othername,
      matricNo,
    });
    await user.save();
    res.json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Route for user login
router.post("/login", async (req, res) => {
  try {
    const { email, phonenumber } = req.body;
    const user = await User.findOne({ email });
    if (user && user.phonenumber === phonenumber) {
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
