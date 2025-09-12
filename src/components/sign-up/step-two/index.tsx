import { useFormik } from "formik";
import { SignUpStepTwoForm, SignUpStepTwoProps } from "./type";
import { CustomButton, CustomInput } from "@/components/customs";

const SignUpStepTwo: React.FC<SignUpStepTwoProps> = ({
  email,
  password,
  handleBackStep,
}) => {
  const { handleSubmit, getFieldProps, touched, errors } =
    useFormik<SignUpStepTwoForm>({
      initialValues: { username: "", age: "" },
      onSubmit: (values) => {
        console.log(values);
      },
    });

  return (
    <form onSubmit={handleSubmit} className="h-full mt-10">
      <div className="flex justify-between flex-col h-full">
        <div className="flex flex-col gap-2">
          <CustomInput
            label="User Name"
            {...getFieldProps("username")}
            isError={!!(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />
          <CustomInput
            label="Age"
            {...getFieldProps("age")}
            isError={!!(touched.age && errors.age)}
            helperText={touched.age && errors.age}
          />
        </div>

        <div className="flex flex-col gap-4">
          <CustomButton type="submit">Next</CustomButton>
          <CustomButton type="button" onClick={handleBackStep}>
            Back
          </CustomButton>
        </div>
      </div>
    </form>
  );
};

export default SignUpStepTwo;
