import React, { useState, useEffect } from "react";
import "./style.scss";
import userApi from "../../API/userApi";
import { useNavigate } from "react-router-dom";
import SuccessToast from "../../components/toast/successtoast";
import ErrorToast from "../../components/toast/errortoast";
import LoadingToast from "../../components/toast/loadingToast";
import { toast } from "react-toastify";
import useStore from "../../store";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setLoginStatus = useStore((state) => state.setLoginStatus);
  const setUserProfile = useStore((state) => state.setUserProfile);

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
      phoneNumber: password,
    };
    try {
      LoadingToast("Logging you in..");
      const response = await userApi.login(credentials);
      // set user return data
      setUserProfile(response);
      toast.dismiss(); // Dismiss the loading toast
      SuccessToast("Login Successful");
      onLogin(); // Set the authentication state
      navigate("/dashboard", { state: { student: response } }); // Redirect to the dashboard
    } catch (error) {
      console.log(error.toString()); // Handle the error
      toast.dismiss(); // Dismiss the loading toast
      ErrorToast(error.toString());
    }
  };

  useEffect(() => {
    setLoginStatus(false);
  }, []);

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
