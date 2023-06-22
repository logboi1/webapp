import React, { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import userApi from "../../API/userApi";
import LoadingToast from "../../components/toast/loadingToast";
import { toast } from "react-toastify";
import ErrorToast from "../../components/toast/errortoast";
import SuccessToast from "../../components/toast/successtoast";

const departments = ["Department A", "Department B", "Department C"]; // Replace with your department options
const levels = ["Level 1", "Level 2", "Level 3"]; // Replace with your level options

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [surname, setSurname] = useState("");
  const [othername, setOthername] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [phone, setPhone] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleOthernameChange = (event) => {
    setOthername(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = {
      email: email,
      surname: surname,
      phoneNumber: phone,
      gender: gender,
      department: department,
      level: level,
      otherName: othername,
    };

    try {
      const { message } = await userApi.register(formData);
      console.log(message); // Handle the response data
      toast.dismiss(); // Dismiss the loading toast
      SuccessToast(message);
    } catch (error) {
      console.error(error); // Handle the error
      toast.dismiss(); // Dismiss the loading toast
      ErrorToast(error.toString());
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <h2>Registration</h2>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={handleEmailChange}
            />
          </label>
          <label>
            Surname:
            <input
              type="text"
              value={surname}
              placeholder="Enter firstname"
              onChange={handleSurnameChange}
            />
          </label>
          <label>
            Othername:
            <input
              type="text"
              value={othername}
              placeholder="Enter othernames"
              onChange={handleOthernameChange}
            />
          </label>
          <label>
            Gender:
            <select value={gender} onChange={handleGenderChange}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label>
            Department:
            <select value={department} onChange={handleDepartmentChange}>
              <option value="">Select department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </label>
          <label>
            Level:
            <select value={level} onChange={handleLevelChange}>
              <option value="">Select level</option>
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </label>

          <label>
            Phone:
            <input
              type="text"
              value={phone}
              placeholder="Enter phonenumber"
              onChange={handlePhoneChange}
            />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
