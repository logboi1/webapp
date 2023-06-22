const express = require("express");
const router = express.Router();

// Import the necessary controller methods
const studentController = require("../controllers/studentController");
const { authMiddleware } = require("../config/authMiddleware");

// Define the routes
// Student Routes
router.post("/students/register", studentController.registerStudent);
router.post("/students/login", studentController.loginStudent);
router.put(
  "/students/:id",
  authMiddleware,
  studentController.updateStudentProfile
);
router.put("/students/me", authMiddleware, studentController.getStudentProfile);

// router.post('/students/:id/upload-profile-picture', studentController.uploadProfilePicture);
// router.post('/students/:id/pay-dues', studentController.paySchoolDues);

module.exports = router;
