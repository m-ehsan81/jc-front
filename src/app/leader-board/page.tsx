import BackButton from "@/components/back-button";
import { RankOne, UserItem } from "@/components/leader-board";
import { UserItemProps } from "@/components/leader-board/user-item/type";

const DATA: UserItemProps[] = [
  { username: "Shayan Sharifi", count: 50, rank: 2 },
];

const LeaderBoard: React.FC = () => {
  return (
    <div className="p-6">
      <BackButton />

      <RankOne />

      <div className="flex flex-col gap-2">
        {DATA.map((item, index) => (
          <UserItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
