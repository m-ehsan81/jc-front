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
    case "START_FETCHING":
      return { ...state, isLoading: true };
    case "END_FETCHING":
      return { ...state, isLoading: false };
    case "SET_INITIAL_DATA":
      return { ...state, ...action.payload };
    case "SET_SCORE":
      return {
        ...state,
        score: action.payload,
      };
    case "UPDATE_SCORE":
      return {
        ...state,
        score: state.score !== null ? ++state.score : state.score,
        limitation:
          state.limitation !== null ? --state.limitation : state.limitation,
      };
    case "SET_USERINFO":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const initialState: UserState = {
  score: null,
  username: null,
  email: null,
  limitation: null,
  isLoading: true,
};

export const UserDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(userDataReducer, initialState);

  const setInitialUserData = async () => {
    if (state.score === null) {
      dispatch({
        type: "START_FETCHING",
      });

      try {
        const response = await apiClient.get<ResType<GetScoreRes>>(
          "/Score/GetScore"
        );

        const { email, score, username, limitation } = response.data.data;

        dispatch({
          type: "SET_INITIAL_DATA",
          payload: { score, email, username, limitation },
        });
      } catch (error) {
        alert(error);
      } finally {
        dispatch({
          type: "END_FETCHING",
        });
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
    setInitialUserData,
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
