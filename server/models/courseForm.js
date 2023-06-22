const mongoose = require("mongoose");

const courseFormSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  semester: [
    {
      value: String,
      label: String,
    },
  ],
  section: [
    {
      value: String,
      label: String,
    },
  ],
  courses: [
    {
      id: String,
      courseTitle: String,
      courseCode: String,
      unit: Number,
    },
  ],
  // Other course form fields
});

const CourseForm = mongoose.model("CourseForm", courseFormSchema);

module.exports = CourseForm;
