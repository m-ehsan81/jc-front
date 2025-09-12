"use client";

import { Suspense, useState } from "react";
import { CustomStepper } from "@/components/customs";
import { InitialDataType } from "./type";
import { SignUpStepOne, SignUpStepTwo, StepThree } from "@/components/sign-up";
import { useSearchParams } from "next/navigation";

const SignUpPage: React.FC = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [activeStep, setActiveStep] = useState(token ? 3 : 1);
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
      key={1}
      handleNextStep={handleNextStep}
      setInitialData={setInitialData}
    />,
    <SignUpStepTwo
      key={2}
      email={initialData.email}
      password={initialData.password}
      handleBackStep={handleBackStep}
    />,
    <StepThree key={3} token={token || ""} />,
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

const SignUp: React.FC = () => {
  return (
    <Suspense>
      <SignUpPage />
    </Suspense>
  );
};

export default SignUp;
