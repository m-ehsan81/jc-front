"use client";

import { useAuth } from "@/context/auth";
import apiClient from "@/lib/axios";
import { useEffect } from "react";

export const useApi = () => {
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return apiClient;
};
