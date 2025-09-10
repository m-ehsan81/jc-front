import { CustomSkeleton } from "@/components/customs";
import { useUserData } from "@/context/user-data";
import { MenuSVG } from "@/svgs";
import Image from "next/image";

const HomeHeader: React.FC = () => {
  const {
    state: { username, email },
  } = useUserData();

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center flex-row-reverse w-full">
        <MenuSVG />

        <div className="flex items-center gap-4">
          {email ? (
            <div className="rounded-full overflow-hidden bg-[linear-gradient(180deg,#F6A50C_0%,rgba(246,165,12,0.20)_139.38%)]">
              <Image
                alt="avatar"
                src="/assets/avatar.png"
                width={40}
                height={40}
              />
            </div>
          ) : (
            <CustomSkeleton variant="circular" width="2.5rem" height="2.5rem" />
          )}

          <span>{username || email || <CustomSkeleton width="10rem" />}</span>
        </div>
      </div>

      <span className="text-[1.125rem] flex gap-2">
        Limited: {email ? "2/3" : <CustomSkeleton width="5rem" />}
      </span>
    </div>
  );
};

export default HomeHeader;
