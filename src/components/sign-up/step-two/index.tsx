import { useFormik } from "formik";
import { SignUpStepTwoForm, SignUpStepTwoProps } from "./type";
import { CustomButton, CustomInput } from "@/components/customs";
import apiClient from "@/lib/axios";

const SignUpStepTwo: React.FC<SignUpStepTwoProps> = ({
  email,
  password,
  handleBackStep,
}) => {
  const submitHandler = async (values: SignUpStepTwoForm) => {
    try {
      const response = await apiClient.post<ResType<void>>("/Accounts/SignUp", {
        ...values,
        email,
        password,
      });
      const { isSuccess } = response.data;

      if (isSuccess) {
      }
    } catch (error) {
      alert(error);
    }
  };

  const { handleSubmit, getFieldProps, touched, errors } =
    useFormik<SignUpStepTwoForm>({
      initialValues: { username: "", age: "" },
      onSubmit: submitHandler,
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
