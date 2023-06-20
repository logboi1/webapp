const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Course Routes
router.post("/courses", courseController.saveCourseForm);
router.get("/courses/:id", courseController.getCourseFormsByStudent);

// router.post("/courses", courseController.createCourse);
// router.get("/courses", courseController.getAllCourses);
// router.get("/courses/:id", courseController.getCourseById);

module.exports = router;
