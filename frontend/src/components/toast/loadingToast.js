import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoadingToast = ({ message }) => {
  return toast.info(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: false,
    closeButton: false,
    closeOnClick: false,
    draggable: false,
    pauseOnHover: false,
    className: "loading-toast",
  });
};

export default LoadingToast;
