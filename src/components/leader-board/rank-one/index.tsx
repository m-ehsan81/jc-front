// "use client";

// import { Avatar1SVG } from "@/svgs";
import Image from "next/image";

const RankOne: React.FC = () => {
  return (
    <div className="flex flex-col items-center mt-16 mb-8">
      <div className="flex items-center">
        <span className="text-[1.875rem]">Leader Board</span>
        <Image alt="cup" src="/assets/cup.png" width={56} height={56} />

        {/* <LeaderBoardSVG /> */}
      </div>

      <div className="relative mt-6">
        <div className="rounded-full overflow-hidden bg-[linear-gradient(180deg,#F6A50C_0%,rgba(246,165,12,0.20)_139.38%)]">
          <Image alt="avatar" src="/assets/avatar.png" width={96} height={96} />
        </div>
        {/* <Avatar1SVG size="96" /> */}
        <span className="absolute -bottom-[1.375rem] right-[1.25rem]">
          <Image alt="medal" src="/assets/medal.png" width={56} height={56} />
        </span>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2">
        <span className="text-[1.25rem]">Ehsan Hakim</span>
        <span className="text-[1.25rem]">95</span>
      </div>
    </div>
  );
};

export default RankOne;
