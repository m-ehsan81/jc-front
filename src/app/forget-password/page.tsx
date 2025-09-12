"use client";

import BackButton from "@/components/back-button";
import { CustomButton, CustomInput } from "@/components/customs";
import { useFormik } from "formik";
import { useState } from "react";
import { validationSchema } from "./validator";
import apiClient from "@/lib/axios";

interface ForgetPasswordForm {
  email: string;
}

const ForgetPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values: ForgetPasswordForm) => {
    setLoading(true);
    try {
      const response = await apiClient.post<ResType<void>>(
        "/Accounts/ForgetPassword",
        values
      );
      const { isSuccess } = response.data;

      if (isSuccess) {
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const { getFieldProps, touched, errors, handleSubmit } =
    useFormik<ForgetPasswordForm>({
      initialValues: { email: "" },
      validationSchema,
      onSubmit: submitHandler,
    });

  return (
    <div className="p-6 h-screen flex flex-col">
      <BackButton title="Forget Password" />
      <form className="h-full mt-[4.875rem]" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-between h-full">
          <div>
            <p className="mb-10 text-[1.25rem]">
              Enter the email and well send an email with instructions to reset
              your password.
            </p>

            <CustomInput
              label="Email Address"
              {...getFieldProps("email")}
              isError={!!(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </div>

          <CustomButton type="submit" isLoading={loading}>
            Send Code
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
