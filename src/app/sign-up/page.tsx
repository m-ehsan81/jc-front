"use client";

import { useState } from "react";
import AuthWrapper from "@/components/auth-warpper";
import {
  CustomInput,
  CustomPassInput,
  CustomStepper,
} from "@/components/customs";
import { InitialDataType } from "./type";
import { SignUpStepOne, SignUpStepTwo, StepThree } from "@/components/sign-up";

const SignUpPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(3);
  const [initialData, setInitialData] = useState<InitialDataType>({
    email: "",
    password: "",
    rePassword: "",
  });

  const handleNextStep = () => setActiveStep((prev) => ++prev);
  const handleBackStep = () => setActiveStep((prev) => --prev);

  const steps = [
    <SignUpStepOne
      {...initialData}
      handleNextStep={handleNextStep}
      setInitialData={setInitialData}
    />,
    <SignUpStepTwo
      email={initialData.email}
      password={initialData.password}
      handleBackStep={handleBackStep}
    />,
    <StepThree />
  ];

  return (
    <div className="px-6 py-10 h-screen flex flex-col">
      <div className="flex justify-between items-center">
        <p className="text-[2rem] text-left">Sign Up</p>

        <CustomStepper activeStep={activeStep} totlaSteps={3} />
      </div>

      {steps[activeStep - 1]}
    </div>
  );
};

export default SignUpPage;
