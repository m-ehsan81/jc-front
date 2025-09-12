import { InitialDataType } from "@/app/sign-up/type";
import {
  CustomButton,
  CustomInput,
  CustomPassInput,
} from "@/components/customs";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

const SignUpStepOne: React.FC<InitialDataType> = ({
  email,
  password,
  rePassword,
}) => {
  const router = useRouter();

  const { handleSubmit, getFieldProps } = useFormik<InitialDataType>({
    initialValues: { email, password, rePassword },
    onSubmit: (values) => console.log(values),
  });

  return (
    <form onSubmit={handleSubmit} className="h-full mt-10">
      <div className="flex justify-between flex-col h-full">
        <div className="flex flex-col gap-2">
          <CustomInput label="Email" {...getFieldProps("email")} />
          <CustomPassInput label="Password" {...getFieldProps("passwrod")} />
          <CustomPassInput
            label="Re-PassWorld"
            {...getFieldProps("rePassword")}
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
