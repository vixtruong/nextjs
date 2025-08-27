"use client";
import { Toast, toastError } from "@/lib/ToastService";
import {
  login as apiLogin,
  LoginData,
  logout as apiLogout,
  register as apiRegister,
  RegisterData,
} from "@/services/authService";
import { signInOAuth as apiSignInOAuth } from "@/services/OAuth2Service";
import { useCallback, useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<{ userId: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const loadUser = useCallback(() => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({ userId: payload.sub });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Load user failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleLogin = async (data: LoginData) => {
    setLoading(true);
    const toastId = Toast.loading("Processing...");
    try {
      await apiLogin(data);

      loadUser();
      window.location.href = "/";
    } catch (error) {
      toastError(error);
    } finally {
      setLoading(false);
      Toast.dismiss(toastId);
    }
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    const toastId = Toast.loading("Processing...");
    try {
      await apiSignInOAuth("github");
      loadUser();
    } catch (error) {
      console.log(error);
      toastError(error);
    } finally {
      setLoading(false);
      Toast.dismiss(toastId);
    }
  };

  const handleRegister = async (data: RegisterData) => {
    setLoading(true);
    const toastId = Toast.loading("Processing...");
    try {
      const result = await apiRegister(data);
      if (result) {
        console.log("Register success:", result);
        Toast.success("Create account successfully.");
      }
    } catch (error) {
      console.log(error);
      toastError(error);
    } finally {
      setLoading(false);
      Toast.dismiss(toastId);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    const toastId = Toast.loading("Processing...");
    try {
      await apiLogout();
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toastError(error);
    } finally {
      setLoading(false);
      Toast.dismiss(toastId);
    }
  };

  return {
    user,
    loading,
    login: handleLogin,
    githubLogin: handleGithubLogin,
    register: handleRegister,
    logout: handleLogout,
  };
}
