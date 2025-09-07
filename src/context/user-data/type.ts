export interface UserContextType {
  state: UserState;
  setInitialUserData: () => Promise<void>;
  updateScore: () => Promise<void>;
}

export interface UserState {
  score: null | number;
  username: string | null;
  email: string | null;
}

export type UserAction =
  | { type: "SET_INITIAL_DATA"; payload: UserState }
  | { type: "SET_SCORE"; payload: number }
  | { type: "UPDATE_SCORE" }
  | { type: "SET_USERINFO"; payload: Omit<UserState, "score"> };

export interface GetScoreRes {
  score: number;
  username: string | null;
  email: string;
  limitation: string;
}
