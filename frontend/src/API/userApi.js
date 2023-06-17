import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // Replace with your API base URL

const userApi = {
  register: async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, formData);
      return response.data; // Return the response data
    } catch (error) {
      throw new Error(error.response.data.message || "Registration failed");
    }
  },

  login: async (credentials) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials);
      return response.data; // Return the response data
    } catch (error) {
      throw new Error(error.response.data.message || "Login failed");
    }
  },
};

export default userApi;
