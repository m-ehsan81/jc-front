import Cookies from "js-cookie";
import axios from "axios";
interface RefreshTokenRes {
  token: string;
  refreshToken: string;
}

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

// Create axios instance for auth API
export const authAPI = axios.create({
  baseURL,
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
      const refreshToken = Cookies.get("refresh-token");
      if (!accessToken || !refreshToken) {
        throw new Error("No refresh token available");
      }

      try {
        const response = await authAPI.post<ResType<RefreshTokenRes>>(
          "/Accounts/RefreshToken",
          {
            refreshToken,
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const { token, refreshToken: newRefToken } = response.data.data;

        Cookies.set("access-token", token, { expires: 1 });
        Cookies.set("refresh-token", newRefToken, { expires: 1 });

        originalRequest.headers.Authorization = `Bearer ${token}`;
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
