const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Course Routes
router.post("/courses", courseController.saveCourseForm);
router.get("/courses/:id", courseController.getCourseFormsByStudent);
router.get(
  "/courses/:id/semester/:semester",
  courseController.getCoursesBySemester
);

module.exports = router;
