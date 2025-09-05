"use client";

import {
  createContext,
  useContext,
  useEffect,
  PropsWithChildren,
  FC,
  useReducer,
} from "react";
import Cookies from "js-cookie";

import { AuthAction, AuthContextType, AuthState } from "./type";
import apiClient from "@/lib/axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        isLoading: false,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      };
    case "REMOVE_TOKEN":
      return {
        isLoading: false,
        token: null,
        refreshToken: null,
      };
    default:
      return state;
  }
};

// Initial state
const initialState: AuthState = {
  isLoading: true,
  token: null,
  refreshToken: null,
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (token: string, refToken: string) => {
    Cookies.set("access-token", token, { expires: 7 });
    Cookies.set("refresh-token", refToken, { expires: 7 });
    dispatch({
      type: "SET_TOKEN",
      payload: { token: token, refreshToken: refToken },
    });
  };

  const logout = () => {
    Cookies.remove("access-token");
    Cookies.remove("refresh-token");
    dispatch({ type: "REMOVE_TOKEN" });
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
      //   type: 'LOGIN',
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
      const storedRefToken = Cookies.get("refresh-token");

      if (storedToken && storedRefToken) {
        dispatch({
          type: "SET_TOKEN",
          payload: { token: storedToken, refreshToken: storedRefToken },
        });
      } else {
        logout();
      }
    };

    initializeAuth();
  }, []);

  const value: AuthContextType = {
    state,
    logout,
    refreshAuthToken,
    login,
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
