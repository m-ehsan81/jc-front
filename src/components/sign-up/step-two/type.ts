import { InitialDataType } from "@/app/sign-up/type";

export interface SignUpStepTwoForm {
  username: string;
  age: string;
}

export interface SignUpStepTwoProps
  extends Omit<InitialDataType, "rePassword"> {
  handleBackStep: () => void;
}
