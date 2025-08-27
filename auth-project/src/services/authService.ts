import axiosInstance from "@/lib/axios";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  birthday: string;
}

export interface OAuthLoginData {
  email: string;
  fullName?: string;
  provider: string;
  providerAccountId: string | number;
}

const API_BASE_URl = process.env.NEXT_PUBLIC_API_BASE_URL;

const authAPI = "api/auth";

export async function login(data: LoginData) {
  await axiosInstance.post(`${API_BASE_URl}/${authAPI}/login`, data);
}

export async function OAuth2Login(data: OAuthLoginData) {
  await axiosInstance.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/third-party/login`,
    data
  );
}

export async function register(data: RegisterData) {
  const res = await axiosInstance.post(
    `${API_BASE_URl}/${authAPI}/register`,
    data
  );

  return res;
}

export async function logout() {
  await axiosInstance.post(`${API_BASE_URl}/${authAPI}/logout`, {});
}

export async function refreshToken() {
  await axiosInstance.post(
    `${API_BASE_URl}/${authAPI}/refresh`,
    {},
    { withCredentials: true }
  );
}
