"use client";

import Link from "next/link";
import { useFormik } from "formik";

import AuthWrapper from "@/components/auth-warpper";
import { CustomInput, CustomPassInput } from "@/components/customs";

import { SignInType } from "./type";
import { useApi } from "@/hooks/use-api";
import { useAuth } from "@/context/auth";
import { useRouter, useSearchParams } from "next/navigation";

const SignIn: React.FC = () => {
  const api = useApi();
  const { login } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();

  const fromParams = searchParams.get("from") || "/home";

  const submitHandler = async (values: SignInType) => {
    try {
      const response = await api.post<ResType<string>>(
        "/Accounts/Login",
        values
      );
      const { data, isSuccess } = response.data;

      if (isSuccess) {
        await login(data);
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
