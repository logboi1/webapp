import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1"; // Replace with your API base URL

const userApi = {
  register: async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/students/register`,
        formData
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.error || "Registration failed");
      } else if (error.request) {
        throw new Error("Network error occurred. Please try again.");
      } else {
        throw new Error("Error occurred. Please try again.");
      }
    }
  },

  login: async (credentials) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/students/login`,
        credentials
      );
      console.log("credentials:", credentials);
      const { student, token } = response.data;
      localStorage.setItem("token", token);
      console.debug(token);
      return student; // Return the student details
    } catch (error) {
      throw new Error(error.response.data.error || "Login failed");
    }
  },

  getProfile: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/students/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve the token from localStorage
        },
      });
      return response.data.student; // Return the student profile data
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.error || "Error fetching student profile"
        );
      } else if (error.request) {
        throw new Error("Network error occurred. Please try again.");
      } else {
        throw new Error("Error occurred. Please try again.");
      }
    }
  },

  updateProfile: async (studentId, formData) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/students/${studentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.message;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.error || "Error updating student profile"
        );
      } else if (error.request) {
        throw new Error("Network error occurred. Please try again.");
      } else {
        throw new Error("Error occurred. Please try again.");
      }
    }
  },
};

export default userApi;
