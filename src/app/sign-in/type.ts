export interface SignInType {
  email: string;
  password: string;
}

export interface SignInRes {
  token: string;
  refreshToken: string;
}
