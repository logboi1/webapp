import { toast } from "react-toastify";

const ErrorToast = (message) => {
  console.log(toast);
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export default ErrorToast;
