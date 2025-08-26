import { Toast } from "@/lib/ToastService";
import {
  login as apiLogin,
  LoginData,
  logout as apiLogout,
  register as apiRegister,
  RegisterData,
} from "@/services/authService";
import { useCallback, useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<{ userId: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const loadUser = useCallback(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));

      setUser({ userId: payload.sub });
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleLogin = async (data: LoginData) => {
    setLoading(true);
    const toastId = Toast.loading("Processing...");
    const result = await apiLogin(data);

    if (result !== null) {
      console.log(result);
    }

    setLoading(false);
    Toast.dismiss(toastId);
    loadUser();
    window.location.href = "/";
  };

  const handleRegister = async (data: RegisterData) => {
    setLoading(true);
    const toastId = Toast.loading("Processing...");
    const result = await apiRegister(data);

    if (result !== null && result !== undefined) {
      console.log("Success: ", result);
      Toast.success("Create account successfully.");
    }

    setLoading(false);
    Toast.dismiss(toastId);
    // loadUser();
  };

  const handleLogout = async () => {
    setLoading(true);
    const toastId = Toast.loading("Processing...");
    await apiLogout();

    setLoading(false);
    Toast.dismiss(toastId);
    window.location.href = "/";
  };

  return {
    user,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
}
