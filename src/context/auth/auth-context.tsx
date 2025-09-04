"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  PropsWithChildren,
  FC,
} from "react";
import Cookies from "js-cookie";

import { AuthContextType } from "./type";
import axios from "axios";
import apiClient from "@/lib/axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (newToken: string) => {
    Cookies.set("access-token", newToken, { expires: 7 });
    setToken(newToken);
  };

  const logout = () => {
    Cookies.remove("access-token");
    setToken(null);
  };

  const refreshAuthToken = async (): Promise<string | null> => {
    try {
      const accessToken = Cookies.get("access-token");
      if (!accessToken) {
        throw new Error("No refresh token available");
      }

      const response = await apiClient.post("/Accounts/RefreshToken", {
        accessToken,
      });
      const { token: newToken, user } = response.data;

      Cookies.set("token", newToken, { expires: 1 });
      Cookies.set("user", JSON.stringify(user), { expires: 1 });

      // dispatch({
      //   type: 'LOGIN_SUCCESS',
      //   payload: { user, token: newToken }
      // });

      return newToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
      throw error;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = Cookies.get("access-token");

      if (storedToken) {
        setToken(storedToken);
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const value: AuthContextType = {
    token,
    login,
    logout,
    isLoading,
    refreshAuthToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
