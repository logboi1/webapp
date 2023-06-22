import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL; // Read from .env file

const paymentApi = {
  savePayment: async (payment) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${BASE_URL}/payments`, payment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.error || "Error saving payment details"
      );
    }
  },

  getPayment: async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/payments/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.error || "Error checking payment status"
      );
    }
  },
};

export default paymentApi;
