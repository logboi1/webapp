import { toast } from "react-toastify";

const SuccessToast = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export default SuccessToast;
