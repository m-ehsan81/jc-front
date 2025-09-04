import Cookies from "js-cookie";
import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

// Create axios instance for auth API
export const authAPI = axios.create({
  baseURL,
  withCredentials: true,
});

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access-token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const accessToken = Cookies.get("access-token");
      if (!accessToken) {
        throw new Error("No refresh token available");
      }

      try {
        const response = await authAPI.get("/Accounts/RefreshToken", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const { token: newToken, user } = response.data;

        Cookies.set("token", newToken, { expires: 1 });
        Cookies.set("user", JSON.stringify(user), { expires: 1 });

        originalRequest.headers.Authorization = `Bearer ${'test'}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // console.error("Token refresh failed:", refreshError);
        // Cookies.remove("token");
        // Cookies.remove("refreshToken");
        // Cookies.remove("user");
        // window.location.href = "/login";
        // return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
