import React, { useEffect, useState } from "react";
import useStore from "../../store";
import courseApi from "../../API/courseApi";
import "./style.scss";
import CourseFormDetails from "./courseFormDetail";

const MyCourseScreen = () => {
  const userProfile = useStore((state) => state.userProfile);
  const [semester, setSemester] = useState("");
  const [semesters, setSemesters] = useState("");
  const [courseForms, setCourseForms] = useState([]);
  const [selectedCourseForm, setSelectedCourseForm] = useState(null);
  const userId = userProfile._id;

  //    fetchSection();
  const sectionOptions = [
    ...new Set(courseForms.map((courseForm) => courseForm.section[0].value)),
  ];

  useEffect(() => {
    fetchCourseFormsBySemester(userId);
  }, []);

  const fetchCourseFormsBySemester = async (userId) => {
    try {
      const response = await courseApi.getCourseFormsByStudent(userId);
      setCourseForms(response);
      console.log("response", response);
    } catch (error) {
      console.log("Error fetching course forms:", error);
    }
  };

  const handlePrint = () => {
    // Implement the print functionality here
    window.print();
  };

  const handleViewCourseForm = (courseForm) => {
    // Handle displaying the selected course form
    setSelectedCourseForm(courseForm);
  };

  return (
    <div>
      {/* Course forms */}
      <table>
        <thead>
          <tr>
            <th>Level</th>
            <th>Semester</th>
            <th>Section</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courseForms.map((courseForm) => (
            <tr key={courseForm._id}>
              <td>{courseForm.semester[0].value}</td>
              <td>null</td>
              <td>{courseForm.section[0].value}</td>
              <td>
                <button onClick={() => handleViewCourseForm(courseForm)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display the selected course form */}
      {selectedCourseForm && (
        <CourseFormDetails
          courseForm={selectedCourseForm}
          onPrint={handlePrint}
        />
      )}
    </div>
  );
};

export default MyCourseScreen;
