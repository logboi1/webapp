import React, { useState } from "react";
import "./style.scss";
import userApi from "../../API/userApi";
import { useNavigate } from "react-router-dom";
import SuccessToast from "../../components/toast/successtoast";
import ErrorToast from "../../components/toast/errortoast";
import LoadingToast from "../../components/toast/loadingToast";
import { toast } from "react-toastify";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let credentials = {
      email: email,
      phonenumber: password,
    };
    try {
      LoadingToast("Logging you in..");
      const { message } = await userApi.login(credentials);
      console.log(message); // Handle the response data
      toast.dismiss(); // Dismiss the loading toast
      SuccessToast(message);
      onLogin(); // Set the authentication state
      navigate("/dashboard"); // Redirect to the dashboard
    } catch (error) {
      console.log(error.toString()); // Handle the error
      toast.dismiss(); // Dismiss the loading toast
      ErrorToast(error.toString());
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src="../../assets/image/logo.png" alt="Logo" />
        <h2>Welcome Back!</h2>
        <p>
          For payments issues and registration, kindly visit CEC CBT Center, you
          can also Click here to send an email to us
        </p>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={handleEmailChange}
            />
          </label>
          <label>
            <input
              type="text"
              value={password}
              placeholder="Enter phone number"
              onChange={handlePasswordChange}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        <div>
          <a href="/recover-password">Recover Password</a> or{" "}
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
