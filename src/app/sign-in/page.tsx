"use client";

import Link from "next/link";
import { useFormik } from "formik";

import AuthWrapper from "@/components/auth-warpper";
import { CustomInput, CustomPassInput } from "@/components/customs";

import { SignInRes, SignInType } from "./type";
import { useAuth } from "@/context/auth";
import { useRouter, useSearchParams } from "next/navigation";
import apiClient from "@/lib/axios";

const SignIn: React.FC = () => {
  const { login } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();

  const fromParams = searchParams.get("from") || "/home";

  const submitHandler = async (values: SignInType) => {
    try {
      const response = await apiClient.post<ResType<SignInRes>>(
        "/Accounts/Login",
        values
      );
      const { data, isSuccess } = response.data;

      if (isSuccess) {
        await login(data.token, data.refreshToken);
        router.replace(fromParams);
      }
    } catch (error) {
      alert(error);
    }
  };

  const { getFieldProps, handleSubmit } = useFormik<SignInType>({
    initialValues: { email: "", password: "" },
    onSubmit: submitHandler,
  });

  return (
    <form onSubmit={handleSubmit}>
      <AuthWrapper title="Sign In" type="sign-in">
        <CustomInput label="Email" {...getFieldProps("email")} />

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
