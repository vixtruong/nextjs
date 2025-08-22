import { Toast } from "@/lib/ToastService";
import axios, { AxiosError } from "axios";

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
    const res = await axios.post(`${API_BASE_URl}/${authAPI}/login`, data);
    console.log(res);
  } catch (error) {
    toastError(error);
  }
}

export async function registerUser(data: RegisterData) {
  try {
    const res = await axios.post(`${API_BASE_URl}/${authAPI}/register`, data);

    return res;
  } catch (error) {
    toastError(error);
  }
}

const toastError = (error: unknown) => {
  if (error instanceof AxiosError) {
    Toast.error(error.response?.data.message);
  } else {
    Toast.error(String(error));
  }
};
