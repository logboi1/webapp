const Student = require("../models/student");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

// Controller function to handle student registration
const registerStudent = async (req, res) => {
  try {
    // Extract student data from the request body
    const {
      surname,
      email,
      phoneNumber,
      profilePicture,
      matricNumber,
      department,
      level,
      address,
      schoolName,
      otherName,
      gender,
    } = req.body;

    // Check if the email or phone number already exists in the database
    const existingStudent = await Student.findOne({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });

    if (existingStudent) {
      return res
        .status(400)
        .json({ error: "Email or phone number already exists" });
    }

    // Create a new student instance
    const student = new Student({
      surname,
      email,
      phoneNumber,
      profilePicture,
      matricNumber,
      department,
      level,
      address,
      schoolName,
      otherName,
      gender,
    });

    // Save the student to the database
    await student.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.error("Error registering student:", error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the student" });
  }
};

// Controller function to handle student login
const loginStudent = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    if (!email || !phoneNumber) {
      return res
        .status(400)
        .json({ error: "Email and phoneNumber are required" });
    }

    // Check if the student exists based on the provided email or phone number
    const student = await Student.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (!student) {
      console.log("Student not found:", email, phoneNumber);
      return res.status(404).json({ error: "Invalid email or phone number" });
    }

    // Check if both email and phone number belong to the same user
    const isCredentialsMatched =
      student.email === email && student.phoneNumber === phoneNumber;
    if (!isCredentialsMatched) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JSON Web Token (JWT) for authentication
    const token = jwt.sign({ studentId: student._id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    // Return the student details along with the token
    res.json({ student, token });
  } catch (error) {
    console.error("Error logging in student:", error);
    res
      .status(500)
      .json({ error: error.message || "An error occurred while logging in" });
  }
};

// Controller function to handle updating student profile
const updateStudentProfile = async (req, res) => {
  try {
    // Extract updated profile data from the request body
    const {
      surname,
      email,
      phoneNumber,
      profilePicture,
      matricNumber,
      department,
      level,
      address,
      schoolName,
      otherName,
      gender,
    } = req.body;

    // Find the student in the database based on their ID
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Update the student's profile data
    student.surname = surname;
    student.email = email;
    student.phoneNumber = phoneNumber;
    student.profilePicture = profilePicture;
    student.matricNumber = matricNumber;
    student.department = department;
    student.level = level;
    student.address = address;
    student.schoolName = schoolName;
    student.otherName = otherName;
    student.gender = gender;

    // Save the updated student data to the database
    await student.save();

    res.json({ message: "Student profile updated successfully" });
  } catch (error) {
    console.error("Error updating student profile:", error);
    res.status(500).json({
      error:
        error.message || "An error occurred while updating the student profile",
    });
  }
};

const getStudentProfile = async (req, res) => {
  try {
    // Retrieve the authenticated student's ID from the request object
    const studentId = req.user.id;

    // Fetch the student profile from the database using the student ID
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Return the student profile data
    res.json(student);
  } catch (error) {
    console.error("Error fetching student profile:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the student profile" });
  }
};

// Export the controller functions
module.exports = {
  registerStudent,
  loginStudent,
  updateStudentProfile,
  getStudentProfile,
};
