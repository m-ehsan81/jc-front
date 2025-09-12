"use client";

import Link from "next/link";
import { useFormik } from "formik";

// import AuthWrapper from "@/components/auth-warpper";
import {
  CustomButton,
  CustomInput,
  CustomPassInput,
} from "@/components/customs";

import { SignInRes, SignInType } from "./type";
import { useAuth } from "@/context/auth";
import { useRouter, useSearchParams } from "next/navigation";
import apiClient from "@/lib/axios";
import { Suspense, useState } from "react";

const SignInPage: React.FC = () => {
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const fromParams = searchParams.get("from") || "/home";

  const submitHandler = async (values: SignInType) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const { getFieldProps, handleSubmit } = useFormik<SignInType>({
    initialValues: { email: "", password: "" },
    onSubmit: submitHandler,
  });

  return (
    <div className="px-6 py-10 h-screen flex flex-col">
      <p className="text-[2rem] text-center">Sign In</p>
      <form onSubmit={handleSubmit} className="h-full mt-10">
        <div className="flex justify-between flex-col h-full">
          <div className="flex flex-col gap-2">
            <CustomInput label="Email" {...getFieldProps("email")} />
            <div>
              <CustomPassInput
                label="Password"
                {...getFieldProps("password")}
              />
              <Link
                href="/forget-password"
                className="!text-[#5CF8FD] text-[1.125rem]"
              >
                Forgot your pass?
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <CustomButton type="submit" isLoading={loading}>
              Sign In
            </CustomButton>
            <CustomButton type="button" onClick={() => router.push("/sign-up")}>
              Sign Up
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
};

const SignIn: React.FC = () => {
  return (
    <Suspense>
      <SignInPage />
    </Suspense>
  );
};

export default SignIn;
