/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const axiosInstance = axios.create({
  // baseURL: process.env.API_URL,
  baseURL: "https://reqbin.com",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // e.g., redirect to login or refresh token
    }

    return Promise.reject(error);
  },
);

export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Optional: Add request interceptors (e.g., attaching JWT tokens)
// request.interceptors.request.use((config) => {
//   if (typeof window !== 'undefined') {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    request<T>({ ...config, method: "GET", url }),

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    request<T>({ ...config, method: "POST", url, data }),

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    request<T>({ ...config, method: "PUT", url, data }),

  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: "PATCH", url, data }),

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    request<T>({ ...config, method: "DELETE", url }),
};
