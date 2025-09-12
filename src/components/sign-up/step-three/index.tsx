import { CustomButton } from "@/components/customs";
import Image from "next/image";

const StepThree: React.FC = () => {
  return (
    <div className="flex flex-col justify-between mt-20 h-full">
      <div className="flex flex-col items-center gap-10">
        <Image
          alt="success"
          src="/assets/success.png"
          width={160}
          height={160}
        />

        <p className="text-center text-[1.875rem]">
          Your account has been created successfully.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <CustomButton type="submit">Go Home Page</CustomButton>
      </div>
    </div>
  );
};

export default StepThree;
