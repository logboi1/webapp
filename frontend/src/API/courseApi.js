import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1"; // Replace with your API base URL

const courseApi = {
  saveCourseForm: async (courseForm) => {
    try {
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
};

export default courseApi;
