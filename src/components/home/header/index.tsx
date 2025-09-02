import { MenuSVG } from "@/svgs";
import Image from "next/image";

const HomeHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center flex-row-reverse w-full">
      <MenuSVG />

      <div className="flex items-center gap-4">
        <div className="rounded-full overflow-hidden bg-[linear-gradient(180deg,#F6A50C_0%,rgba(246,165,12,0.20)_139.38%)]">
          <Image alt="avatar" src="/assets/avatar.png" width={40} height={40} />
        </div>

        <span>Welcome Ehsan!</span>
      </div>
    </div>
  );
};

export default HomeHeader;
