"use client";

import { useAuth } from "@/context/auth";
import apiClient from "@/lib/axios";
import { useEffect } from "react";

export const useApi = () => {
  const { state } = useAuth();

  useEffect(() => {
    if (state.token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
    } else {
      delete apiClient.defaults.headers.common["Authorization"];
    }
  }, [state.token]);

  return apiClient;
};
