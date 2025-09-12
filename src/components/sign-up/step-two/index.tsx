import { InitialDataType } from "@/app/sign-up/type";

const SignUpStepTwo: React.FC<Omit<InitialDataType, "rePassword">> = ({
  email,
  password,
}) => {
  return <div>SignUpStepTwo</div>;
};

export default SignUpStepTwo;
