import axiosInstance from "@/lib/axios";
import { toastError } from "@/lib/ToastService";

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  fullName: string;
  birthday: string;
}

const API_BASE_URl = process.env.NEXT_PUBLIC_API_BASE_URL;

const authAPI = "api/auth";

export async function login(data: LoginData) {
  try {
    await axiosInstance.post(`${API_BASE_URl}/${authAPI}/login`, data);
  } catch (error) {
    toastError(error);
  }
}

export async function register(data: RegisterData) {
  try {
    const res = await axiosInstance.post(
      `${API_BASE_URl}/${authAPI}/register`,
      data
    );

    return res;
  } catch (error) {
    toastError(error);
  }
}

export async function logout() {
  try {
    await axiosInstance.post(`${API_BASE_URl}/${authAPI}/logout`, {});
  } catch (error) {
    toastError(error);
  }
}

export async function refreshToken() {
  try {
    await axiosInstance.post(`${API_BASE_URl}/${authAPI}/refresh`, {});
  } catch (error) {
    toastError(error);
  }
}
