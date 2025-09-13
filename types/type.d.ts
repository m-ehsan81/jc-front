// types/global.d.ts
declare global {
  interface ResType<T> {
    isSuccess: boolean;
    data: T;
    message: string;
    statusCode: number;
  }
}

export {};
