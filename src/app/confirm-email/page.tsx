"use client";

import { CustomLoading } from "@/components/customs";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const ConfirmEmailPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      router.replace("/forget-password");
    }
  }, [email, router]);

  if (!email) {
    return (
      <div className="h-screen flex items-center justify-center">
        <CustomLoading />
      </div>
    );
  }

  return <div>ConfirmEmail</div>;
};

const ConfirmEmail = () => {
  return (
    <Suspense>
      <ConfirmEmailPage />
    </Suspense>
  );
};

export default ConfirmEmail;
