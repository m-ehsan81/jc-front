"use client";

import Link from "next/link";
import { useFormik } from "formik";

import AuthWrapper from "@/components/auth-warpper";
import { CustomInput, CustomPassInput } from "@/components/customs";

import { SignInType } from "./type";
import { useApi } from "@/hooks/use-api";

const SignIn: React.FC = () => {
  const api = useApi();

  const submitHandler = async (values: SignInType) => {
    try {
      const response = await api.post("/Accounts/Login", values);
      console.log(response);
    } catch (error) {}
  };

  const { getFieldProps, handleSubmit } = useFormik<SignInType>({
    initialValues: { email: "", password: "" },
    onSubmit: submitHandler,
  });

  return (
    <form onSubmit={handleSubmit}>
      <AuthWrapper title="Sign In" type="sign-in">
        <CustomInput label="User Name" {...getFieldProps("email")} />

        <div>
          <CustomPassInput label="Password" {...getFieldProps("password")} />
          <Link
            href="/forget-password"
            className="!text-[#5CF8FD] text-[1.125rem]"
          >
            Forgot your pass?
          </Link>
        </div>
      </AuthWrapper>
    </form>
  );
};

export default SignIn;
