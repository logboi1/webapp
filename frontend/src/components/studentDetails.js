import React from "react";
import Card from "./card/card";
import "./style.scss";

const StudentDetailsScreen = ({ studentDetail, profileUpdate }) => {
  return (
    <div className="student-details-screen">
      <div className="card-container">
        <Card title="Student Details">
          <div className="student">
            <div>
              <p>
                {studentDetail.surname} {studentDetail.otherName}
              </p>
              <p>{studentDetail.email}</p>
              <p>{studentDetail.phoneNumber}</p>
              <p>{studentDetail.level}</p>
              <p>{studentDetail.department}</p>
            </div>
            <div>
              <img src="./reactjs.png" alt="Logo" />
            </div>
          </div>

          <div className="btnDiv">
            <button onClick={profileUpdate}>Update Profile</button>
          </div>
        </Card>
      </div>

      <div className="card-container">
        <Card title="School Details">
          <p>School of Science and Computer studies</p>
          <p>{studentDetail.department}</p>
          <p>{studentDetail.level}</p>
        </Card>
      </div>

      <div className="card-container">
        <Card title="Exam Permit">
          <p>Note: You can only print your permit after you pay your dues</p>
          <div className="btnDiv">
            <button disabled>Print Permit</button>
          </div>
        </Card>
      </div>

      <div className="card-container">
        <Card title="School Calendar">{/* Content for School Calendar */}</Card>
      </div>

      <div className="card-container">
        <Card title="News">{/* Content for News */}</Card>
      </div>
    </div>
  );
};

export default StudentDetailsScreen;
