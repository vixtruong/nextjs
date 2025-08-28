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
  refreshToken,
} from "@/services/authService";
import {
  signInOAuth as apiSignInOAuth,
  signOutOAuth,
} from "@/services/oAuth2Service";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";

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

  const pathname = usePathname();

  const loadUser = useCallback(async () => {
    setLoading(true);

    const publicRoutes = ["/login", "/register", "/forgot-password"];

    if (publicRoutes.includes(pathname)) {
      return;
    }

    try {
      const token = Cookies.get("accessToken");

      if (!token) {
        try {
          await refreshToken();
        } catch (err) {
          console.log(err);
          setUser(null);
          return;
        }
      }

      const res = await getProfile();
      setUser(res);
    } catch (error) {
      setUser(null);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [pathname]);

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
