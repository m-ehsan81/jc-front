"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { GetScoreRes, UserAction, UserContextType, UserState } from "./type";
import apiClient from "@/lib/axios";

const UserDataContext = createContext<UserContextType | undefined>(undefined);

const userDataReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "SET_SCORE":
      return {
        score: action.payload,
      };
    case "UPDATE_SCORE":
      return {
        score: state.score !== null ? ++state.score : state.score,
      };
    case "SET_USERNAME":
      return {
        score: 0,
      };
    default:
      return state;
  }
};

const initialState: UserState = {
  score: null,
};

export const UserDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(userDataReducer, initialState);

  const setInitialScore = async () => {
    if (state.score === null) {
      try {
        const response = await apiClient.get<ResType<GetScoreRes>>(
          "/Score/GetScore"
        );

        dispatch({
          type: "SET_SCORE",
          payload: response.data.data.score,
        });
      } catch (error) {
        alert(error);
      }
    }
  };

  const updateScore = async () => {
    const response = await apiClient.post<ResType<void>>("/Score/UpdateScore");

    if (response.data.isSuccess) {
      dispatch({ type: "UPDATE_SCORE" });
    }
  };

  const value: UserContextType = {
    state,
    setInitialScore,
    updateScore,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);

  if (context === undefined) {
    throw new Error("useUserData must be used within an UserDataProvider");
  }
  return context;
};
