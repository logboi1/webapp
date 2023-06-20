import React, { useEffect, useState, useRef } from "react";
import "./style.scss";
import userApi from "../API/userApi";
import SuccessToast from "./toast/successtoast";
import ErrorToast from "./toast/errortoast";

const ProfileUpdate = ({ data }) => {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    address: "",
    schoolName: "",
    surname: "",
    level: "",
    department: "",
    profilePicture: "",
    gender: "",
    otherName: "",
    matricNumber: "",
  });
  const studentId = data._id;

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0], // Store the selected file object
    });
  };
  //   const handleSelectImage = () => {
  //     // Programmatically trigger the file input click event
  //     fileInputRef.current.click();
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Add submit logic here
    console.log("path:", formData.profilePicture);
    try {
      const response = await userApi.updateProfile(studentId, formData);
      console.log("Student profile updated successfully", response);
      // Add code to show a success notification or redirect to another page
      SuccessToast(response.message);
    } catch (error) {
      console.error("Error updating student profile:", error);
      const errorMessage =
        (error.response && error.response.data && error.response.data.error) ||
        "An error occurred while updating the student profile";
      // Add code to show an error message or handle the error appropriately
      // For example, you can display the error message in a toast notification
      ErrorToast(errorMessage);
    }
  };

  useEffect(() => {
    setFormData({
      email: data.email,
      phoneNumber: data.phoneNumber,
      surname: data.surname,
      otherName: data.otherName,
      gender: data.gender,
      department: data.department,
      level: data.level,
      address: data.address,
      schoolName: data.schoolName,
      matricNumber: data.matricNumber,
    });
  }, []);

  return (
    <div className="profile-update">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="collection">
          <div className="entry">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="entry">
            <label>MatricNumber:</label>
            <input
              type="text"
              name="matricNumber"
              value={formData.matricNumber}
              onChange={handleChange}
            />
          </div>
          <div className="entry">
            <label>Surname:</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
            />
          </div>
          <div className="entry">
            <label>OtherName:</label>
            <input
              type="text"
              name="otherName"
              value={formData.otherName}
              onChange={handleChange}
            />
          </div>
          <div className="entry">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="entry">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="entry">
            <label>Gender:</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
          </div>
          <div className="entry">
            <label>School Name:</label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
            />
          </div>
          <div className="entry">
            <label>Department:</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>
          <div className="entry">
            <label>Level:</label>
            <input
              type="text"
              name="level"
              value={formData.level}
              onChange={handleChange}
            />
          </div>
          <div className="entry">
            <label>Profile Picture:</label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
              ref={fileInputRef}
              //   style={{ display: "none" }} // Hide the file input element
            />
            {/* <button type="button" onClick={handleSelectImage}>
              Select Image
            </button> */}

            <div className="preview-container">
              {formData.profilePicture && (
                <img
                  src={URL.createObjectURL(formData.profilePicture)}
                  alt="Profile"
                  className="preview-image"
                />
              )}
            </div>
          </div>
        </div>

        <button className="btn" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
