import React, { useState, useEffect } from "react";
import "./style.scss";
import StudentDetailsScreen from "../../components/studentDetails";
import { useLocation } from "react-router-dom";
import ProfileUpdate from "../../components/profileUpdate";
import CourseFormScreen from "../../components/courseform";
import { useNavigate } from "react-router-dom";
import MyCourseScreen from "../../components/courseComponent/myCourseScreen";
import PaymentPage from "../../components/payment";

const Dashboard = ({ onLogout }) => {
  const [selectedOption, setSelectedOption] = useState("studentDetails");
  const location = useLocation();
  const navigate = useNavigate();
  const { student } = location.state;

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleProfileUpdate = () => {
    setSelectedOption("updateProfile");
  };

  const handleAllCourseForm = () => {
    setSelectedOption("allCourseForm");
  };

  const handleLogout = () => {
    onLogout();
  };

  useEffect(() => {}, []);

  const renderContent = () => {
    switch (selectedOption) {
      case "studentDetails":
        return (
          <StudentDetailsScreen
            studentDetail={student}
            profileUpdate={handleProfileUpdate}
          />
        );
      case "updateProfile":
        return <ProfileUpdate data={student} />;
      case "courseForm":
        return (
          <CourseFormScreen data={student} viewCourses={handleAllCourseForm} />
        );
      case "allCourseForm":
        return <MyCourseScreen />;
      case "uploadReceipt":
        return <UploadReceiptScreen />;
      case "printPermit":
        return <PrintPermitScreen />;
      case "payFee":
        return <PaymentPage />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <img src="../../../assets/logo.png" alt="Logo" />
        <ul className="sidebar-menu">
          <li
            className={selectedOption === "studentDetails" ? "active" : ""}
            onClick={() => handleOptionClick("studentDetails")}>
            Dashboard
          </li>
          <li
            className={selectedOption === "courseForm" ? "active" : ""}
            onClick={() => handleOptionClick("courseForm")}>
            Course Form
          </li>
          <li
            className={selectedOption === "uploadReceipt" ? "active" : ""}
            onClick={() => handleOptionClick("uploadReceipt")}>
            Upload Receipt
          </li>
          <li
            className={selectedOption === "printPermit" ? "active" : ""}
            onClick={() => handleOptionClick("printPermit")}>
            Print Permit
          </li>
          <li
            className={selectedOption === "payFee" ? "active" : ""}
            onClick={() => handleOptionClick("payFee")}>
            Pay Fee
          </li>
          <li className="logout" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>
      <div className="content">
        <div className="topBar">
          <h3>Welcome Back</h3>
          <h3>
            {student.surname} {student.otherName}
          </h3>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

const UploadReceiptScreen = () => {
  return <div>Upload Receipt Screen</div>;
};

const PrintPermitScreen = () => {
  return <div>Print Permit Screen</div>;
};

export default Dashboard;
