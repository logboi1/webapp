const Course = require("../models/courseForm");

// Controller function to handle saving course form for a student
const saveCourseForm = async (req, res) => {
  try {
    // Extract student ID and course data from the request body
    const { userId, semester, courses, section } = req.body;

    // Create a new course instance
    const course = new Course({
      userId,
      semester,
      courses,
      section,
    });

    // Save the course form to the database
    await course.save();

    res.status(201).json({ message: "Course form saved successfully" });
  } catch (error) {
    console.error("Error saving course form:", error);

    // Check if the error is due to validation failure
    if (error.name === "ValidationError") {
      // Extract and format the validation errors
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );

      res.status(400).json({ error: validationErrors });
    } else {
      res
        .status(500)
        .json({ error: "An error occurred while saving the course form" });
    }
  }
};

// Controller function to get course forms for a student
const getCourseFormsByStudent = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the course forms for the specified student ID
    const courseForms = await Course.find({ userId });

    res.json(courseForms);
  } catch (error) {
    console.error("Error getting course forms:", error);
    res
      .status(500)
      .json({ error: "An error occurred while getting the course forms" });
  }
};

// Export the controller functions
module.exports = {
  saveCourseForm,
  getCourseFormsByStudent,
};
