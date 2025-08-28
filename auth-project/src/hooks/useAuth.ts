"use client";
import { OAuthProvider } from "@/constants/OAuthProvider";
import { Toast, toastError } from "@/lib/ToastService";
import {
  login as apiLogin,
  LoginData,
  logout as apiLogout,
  register as apiRegister,
  RegisterData,
  getProfile,
} from "@/services/authService";
import {
  signInOAuth as apiSignInOAuth,
  signOutOAuth,
} from "@/services/OAuth2Service";
import { useCallback, useEffect, useState } from "react";

export interface UserResponse {
  id: number;
  fullName: string;
  email: string;
  avatarUrl?: string;
  createdTime: number;
}

export function useAuth() {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const loadUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProfile();
      setUser(res);
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

      // loadUser();
      window.location.href = "/";
    } catch (error) {
      toastError(error);
    } finally {
      setLoading(false);
      Toast.dismiss(toastId);
    }
  };

  const handleGithubLogin = async () => {
    await apiSignInOAuth(OAuthProvider.GITHUB);
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

  const handleLogoutOAuth = async () => {
    try {
      await signOutOAuth();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    login: handleLogin,
    githubLogin: handleGithubLogin,
    register: handleRegister,
    logout: handleLogout,
    logoutOAuth: handleLogoutOAuth,
  };
}
