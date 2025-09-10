"use client";

import { useState } from "react";
import AuthWrapper from "@/components/auth-warpper";
import { CustomInput, CustomPassInput } from "@/components/customs";
import { InitialDataType } from "./type";

const SignUpPage: React.FC = () => {
  const [initialData, setInitialData] = useState<InitialDataType>({
    email: "",
    password: "",
  });

  return (
    <AuthWrapper title="Sign Up" type="sign-up">
      <CustomInput label="User Name" />

      <CustomPassInput label="Password" />

      <CustomPassInput label="Re-PassWorld" />
    </AuthWrapper>
  );
};

export default SignUpPage;
