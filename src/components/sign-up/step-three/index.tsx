import { CustomButton, CustomLoading } from "@/components/customs";
import apiClient from "@/lib/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const StepThree: React.FC<{ token: string }> = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const encodedToken = encodeURIComponent(token);

        await apiClient.get(`Accounts/EmailConfirmation?token=${encodedToken}`);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <CustomLoading />
      </div>
    );
  } else if (error) {
    return <div>error on creating user</div>;
  } else {
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
          <CustomButton onClick={() => router.replace("/sign-in")}>
            Go Sign In
          </CustomButton>
        </div>
      </div>
    );
  }
};

export default StepThree;
