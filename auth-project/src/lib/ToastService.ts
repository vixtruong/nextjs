import { AxiosError } from "axios";
import { toast } from "sonner";

class ToastService {
  success(message: string, description?: string) {
    toast.success(message, {
      description,
      duration: 3000,
    });
  }

  error(message: string, description?: string) {
    toast.error(message, {
      description,
      duration: 3000,
    });
  }

  info(message: string, description?: string) {
    toast(message, {
      description,
      duration: 3000,
    });
  }

  loading(message: string) {
    return toast.loading(message);
  }

  dismiss(toastId?: string | number) {
    toast.dismiss(toastId);
  }
}

export const toastError = (error: unknown) => {
  if (error instanceof AxiosError) {
    Toast.error(error.response?.data?.message || error.message);
    console.log(error);
  } else {
    Toast.error(String(error));
  }
};

export const Toast = new ToastService();
