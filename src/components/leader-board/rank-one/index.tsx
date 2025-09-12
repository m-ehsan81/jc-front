import Image from "next/image";
import { RankOneProps } from "./type";
import { CustomSkeleton } from "@/components/customs";

const RankOne: React.FC<RankOneProps> = ({ loading, user }) => {
  const showLoading = loading || !user;

  return (
    <div className="flex flex-col items-center mt-16 mb-8">
      <div className="flex items-center">
        <span className="text-[1.875rem]">Leader Board</span>
        <Image alt="cup" src="/assets/cup.png" width={56} height={56} />
      </div>

      <div className="relative mt-6">
        {showLoading ? (
          <CustomSkeleton variant="circular" height="6rem" width="6rem" />
        ) : (
          <>
            <div className="rounded-full overflow-hidden bg-[linear-gradient(180deg,#F6A50C_0%,rgba(246,165,12,0.20)_139.38%)]">
              <Image
                alt="avatar"
                src="/assets/avatar.png"
                width={96}
                height={96}
              />
            </div>

            <span className="absolute -bottom-[1.375rem] right-[1.25rem]">
              <Image
                alt="medal"
                src="/assets/medal.png"
                width={56}
                height={56}
              />
            </span>
          </>
        )}
      </div>

      <div className="mt-8 flex flex-col items-center gap-2">
        {showLoading ? (
          <>
            <CustomSkeleton width="8.125rem" />
            <CustomSkeleton width="2.5rem" />
          </>
        ) : (
          <>
            <span className="text-[1.25rem]">{user.username}</span>
            <span className="text-[1.25rem]">{user.score}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default RankOne;
