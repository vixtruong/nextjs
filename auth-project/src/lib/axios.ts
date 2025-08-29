import { refreshToken } from "@/services/authService";
import axios from "axios";

const publicAPIs = ["/api/auth/login", "/api/auth/oauth", "/api/auth/register"];

const API_BASE_URl = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URl,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: {
  resolve: (token?: string) => void;
  reject: (err: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token || "");
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !publicAPIs.some((api) => (originalRequest.url || "").includes(api))
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(axiosInstance(originalRequest)),
            reject: (err) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshToken();

        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

// import { refreshToken } from "@/services/authService";
// import axios from "axios";

// const publicAPIs = ["/api/auth/login", "/api/auth/oauth"];

// const API_BASE_URl = process.env.NEXT_PUBLIC_API_BASE_URL;

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URl,
//   withCredentials: true,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes("/api/auth/oauth") &&
//       !publicAPIs.some((api) => originalRequest.url.includes(api))
//     ) {
//       originalRequest._retry = true;

//       try {
//         await refreshToken();

//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.error("Refresh token failed", refreshError);
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
