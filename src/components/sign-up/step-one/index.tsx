import { Dispatch, FC, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";

import { InitialDataType } from "@/app/sign-up/type";
import {
  CustomButton,
  CustomInput,
  CustomPassInput,
} from "@/components/customs";
import { validationSchema } from "./validator";

interface SignUpStepOneProps extends InitialDataType {
  setInitialData: Dispatch<SetStateAction<InitialDataType>>;
  handleNextStep: () => void;
}

const SignUpStepOne: FC<SignUpStepOneProps> = ({
  email,
  password,
  rePassword,
  handleNextStep,
  setInitialData,
}) => {
  const router = useRouter();

  const { handleSubmit, getFieldProps, touched, errors } =
    useFormik<InitialDataType>({
      initialValues: { email, password, rePassword },
      validationSchema,
      onSubmit: (values) => {
        setInitialData(values);
        handleNextStep();
      },
    });

  return (
    <form onSubmit={handleSubmit} className="h-full mt-10">
      <div className="flex justify-between flex-col h-full">
        <div className="flex flex-col gap-2">
          <CustomInput
            label="Email"
            {...getFieldProps("email")}
            isError={!!(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <CustomPassInput
            label="Password"
            {...getFieldProps("password")}
            isError={!!(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <CustomPassInput
            label="Re-PassWorld"
            {...getFieldProps("rePassword")}
            isError={!!(touched.rePassword && errors.rePassword)}
            helperText={touched.rePassword && errors.rePassword}
          />
        </div>

        <div className="flex flex-col gap-4">
          <CustomButton type="submit">Next</CustomButton>
          <CustomButton type="button" onClick={() => router.push("/sign-up")}>
            Sign In
          </CustomButton>
        </div>
      </div>
    </form>
  );
};

export default SignUpStepOne;
