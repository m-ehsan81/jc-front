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
