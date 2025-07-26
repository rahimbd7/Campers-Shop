import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "sweetalert2/dist/sweetalert2.min.css";

/**
 * ✅ Confirmation Modal (SweetAlert2)
 */
export const confirmAction = async (
  title: string,
  text: string,
  confirmButtonText = "Yes, do it!"
) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText,
  });

  return result.isConfirmed; // returns true if confirmed
};

/**
 * ✅ Toast Notifications (React-Toastify)
 */
export const notifySuccess = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

export const notifyError = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

export const notifyInfo = (message: string) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 3000,
  });
};
