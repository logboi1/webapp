import React, { useState } from "react";
import "./style.scss";
import StudentDetailsScreen from "../../components/studentDetails";

const Dashboard = ({ onLogout }) => {
  const [selectedOption, setSelectedOption] = useState("studentDetails");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleLogout = () => {
    // Perform any necessary logout actions
    // For example, clear authentication token or user session
    // Then redirect to the login page
    onLogout();
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "studentDetails":
        return <StudentDetailsScreen />;
      case "courseForm":
        return <CourseFormScreen />;
      case "uploadReceipt":
        return <UploadReceiptScreen />;
      case "printPermit":
        return <PrintPermitScreen />;
      case "payFee":
        return <PayFeeScreen />;
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
            Student Details
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
      <div className="content">{renderContent()}</div>
    </div>
  );
};

const CourseFormScreen = () => {
  return <div>Course Form Screen</div>;
};

const UploadReceiptScreen = () => {
  return <div>Upload Receipt Screen</div>;
};

const PrintPermitScreen = () => {
  return <div>Print Permit Screen</div>;
};

const PayFeeScreen = () => {
  return <div>Pay Fee Screen</div>;
};

export default Dashboard;
