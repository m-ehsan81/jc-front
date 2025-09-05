export interface UserContextType {
  state: UserState;
  setInitialScore: () => Promise<void>;
  updateScore: () => Promise<void>;
}

export interface UserState {
  score: null | number;
}

export type UserAction =
  | { type: "SET_SCORE"; payload: number }
  | { type: "UPDATE_SCORE" }
  | { type: "SET_USERNAME" };

export interface GetScoreRes {
  score: number;
  username: string;
  limitation: string;
}
