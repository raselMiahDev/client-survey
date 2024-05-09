import toast from "react-hot-toast";

class FormHelper {
  SuccessToast(msg) {
    toast.success(msg, { position: "top-center" });
  }

  ErrorToast(msg) {
    toast.error(msg, { position: "top-center" });
  }
}

export const { SuccessToast, ErrorToast } = new FormHelper();
