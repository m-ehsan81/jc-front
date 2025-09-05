export interface AuthState {
  isLoading: boolean;
  token: string | null;
  refreshToken: string | null;
}

export type AuthAction =
  | { type: "SET_TOKEN"; payload: Omit<AuthState, "isLoading"> }
  | { type: "REMOVE_TOKEN" };

export interface AuthContextType {
  state: AuthState;
  login: (token: string, refreshToken: string) => Promise<void>;
  logout: () => void;
  refreshAuthToken: () => Promise<string | null>;
}
