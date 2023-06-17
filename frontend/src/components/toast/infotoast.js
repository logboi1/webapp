import React from "react";
import { toast } from "react-toastify";

const InfoToast = (message) => {
  toast.info(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export default InfoToast;
