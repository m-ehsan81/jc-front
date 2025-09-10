export interface UserContextType {
  state: UserState;
  setInitialUserData: () => Promise<void>;
  updateScore: () => Promise<void>;
}

export interface UserState {
  score: null | number;
  username: string | null;
  email: string | null;
  isLoading: boolean;
}

export type UserAction =
  | { type: "START_FETCHING" }
  | { type: "END_FETCHING" }
  | { type: "SET_INITIAL_DATA"; payload: Omit<UserState, "isLoading"> }
  | { type: "SET_SCORE"; payload: number }
  | { type: "UPDATE_SCORE" }
  | { type: "SET_USERINFO"; payload: Omit<UserState, "score"> };

export interface GetScoreRes {
  score: number;
  username: string | null;
  email: string;
  limitation: string;
}
