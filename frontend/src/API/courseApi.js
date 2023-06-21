import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL; // Read from .env file

const courseApi = {
  saveCourseForm: async (courseForm) => {
    try {
      console.log("baseUrl", BASE_URL);
      const token = localStorage.getItem("token");
      const response = await axios.post(`${BASE_URL}/courses`, courseForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error || "Error saving course form");
    }
  },

  getCourseFormsByStudent: async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/courses/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.error || "Error getting course forms"
      );
    }
  },

  getCoursesBySemester: async (userId, semester) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/courses/${userId}/semester/${semester}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.error || "Error getting courses by semester"
      );
    }
  },
};

export default courseApi;
