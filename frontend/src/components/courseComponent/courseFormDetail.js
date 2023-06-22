import React from "react";

const CourseFormDetails = ({ courseForm, onPrint }) => {
  const handlePrint = () => {
    const printContent = document.getElementById("courseFormDetails");

    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.close();
    printWindow.print();
  };
  return (
    <div id="courseFormDetails" style={{ marginTop: "2em" }}>
      <div style={{ textAlign: "center", marginBottom: "1em" }}>
        <h4>Course Form Detail</h4>
        <h5>{`The Federal Polytechnic, Ado Ekiti (CEC)`}</h5>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Course Code</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {courseForm.courses.map((course) => (
            <tr key={course._id}>
              <td>{course.courseTitle}</td>
              <td>{course.courseCode}</td>
              <td>{course.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={{ marginTop: "1em" }} onClick={handlePrint}>
        Print
      </button>
    </div>
  );
};

export default CourseFormDetails;
