"use client";

import { useEffect } from "react";
import { useUserData } from "@/context/user-data";
import { CounterBtn, HomeBtnWrapper, HomeHeader } from "@/components/home";

const Home: React.FC = () => {
  const { setInitialUserData } = useUserData();

  useEffect(() => {
    setInitialUserData();
  }, []);

  return (
    <div className="h-screen box-border py-10 px-6 flex flex-col justify-between items-center">
      <HomeHeader />

      <CounterBtn />

      <HomeBtnWrapper />
    </div>
  );
};

export default Home;
