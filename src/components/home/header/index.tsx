import { CustomSkeleton } from "@/components/customs";
import { useUserData } from "@/context/user-data";
import { MenuSVG } from "@/svgs";
import Image from "next/image";

const HomeHeader: React.FC = () => {
  const {
    state: { username, email },
  } = useUserData();

  return (
    <div className="flex justify-between items-center flex-row-reverse w-full">
      <MenuSVG />

      <div className="flex items-center gap-4">
        <div className="rounded-full overflow-hidden bg-[linear-gradient(180deg,#F6A50C_0%,rgba(246,165,12,0.20)_139.38%)]">
          <Image alt="avatar" src="/assets/avatar.png" width={40} height={40} />
        </div>

        <span>{username || email || <CustomSkeleton width="200px" />}</span>
      </div>
    </div>
  );
};

export default HomeHeader;
