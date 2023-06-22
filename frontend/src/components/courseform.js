import { useState } from "react";
import Select from "react-dropdown-select";
import courseApi from "../API/courseApi";
import SuccessToast from "./toast/successtoast";
import ErrorToast from "./toast/errortoast";

const CourseFormScreen = ({ data, viewCourses }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const studentId = data._id;

  const options = [
    {
      id: "CSE101",
      courseCode: "CSE101",
      courseTitle: "Computer Internet",
      unit: 3,
    },
    { id: "MAT201", courseCode: "MAT201", courseTitle: "Statistics", unit: 4 },
  ];

  const levelOptions = [
    {
      value: "ND 1",
      label: "ND 1",
    },
    {
      value: "ND 2",
      label: "ND 2",
    },
    {
      value: "HND 1",
      label: "HND 1",
    },
    {
      value: "HND 2",
      label: "HND 2",
    },
    {
      value: "Carry Over",
      label: "Carry Over",
    },
  ];
  const schoolSectionOptions = [
    {
      value: "2020/2021",
      label: "2020/2021",
    },
    {
      value: "2021/2022",
      label: "2021/2022",
    },
    {
      value: "2022/2023",
      label: "2022/2023",
    },
  ];

  const handleCourseSelection = (course) => {
    setSelectedCourses([...selectedCourses, course]);
  };

  const handleRemoveLastCourse = () => {
    setSelectedCourses(selectedCourses.slice(0, selectedCourses.length - 1));
  };

  // Function to handle section selection
  const handleSectionSelection = (section) => {
    setSelectedSection(section);
  };

  // Function to handle level selection
  const handleLevelSelection = (level) => {
    setSelectedLevel(level);
  };

  // Function to save the selected courses with section and level
  const handleSaveCourses = async () => {
    try {
      const courseForm = {
        userId: studentId, // Replace with the actual user ID
        semester: selectedLevel,
        section: selectedSection,
        courses: selectedCourses,
      };

      const { message } = await courseApi.saveCourseForm(courseForm);

      // Handle the success response
      console.log("Courses saved successfully:", message);
      SuccessToast(message);
      // Clear the selected courses
      setSelectedCourses([]);
    } catch (error) {
      // Handle the error response
      console.error("Error saving courses:", error);
      ErrorToast("Error Saving CourseForm");

      // Optionally, you can show an error message to the user
    }
  };

  return (
    <div className="course-form ">
      <button onClick={viewCourses}>View all Course forms</button>
      <div className="course-form__header">
        {/* School Section selection */}
        <Select
          options={schoolSectionOptions}
          onChange={(values) => handleSectionSelection(values[0])}
          placeholder="Select School Section"
        />

        {/* Level selection */}
        <Select
          options={levelOptions}
          onChange={(values) => handleLevelSelection(values[0])}
          placeholder="Select Level"
        />
      </div>

      {/* Course selection dropdown */}
      <Select
        options={options}
        onChange={(values) => handleCourseSelection(values[0])}
        labelField={"courseTitle"}
        valueField="id"
        searchBy="label"
        // multi
      />

      {/* Display selected courses in a table */}
      <table>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Title</th>
            <th>Unit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedCourses.map((course) => (
            <tr key={course.id}>
              <td>{course.courseCode}</td>
              <td>{course.courseTitle}</td>
              <td>{course.unit}</td>
              <td>
                <button onClick={handleRemoveLastCourse}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Save button */}
      <button onClick={handleSaveCourses}>Save</button>
    </div>
  );
};

export default CourseFormScreen;
