"use client";

import { useEffect, useState } from "react";

import BackButton from "@/components/back-button";
import { RankOne, UserItem } from "@/components/leader-board";
// import { UserItemProps } from "@/components/leader-board/user-item/type";
import apiClient from "@/lib/axios";
import { CustomSkeleton } from "@/components/customs";
import { LeaderBoardItemType } from "./type";

// const DATA: UserItemProps[] = [
//   { username: "Shayan Sharifi", count: 50, rank: 2 },
//   { username: "Amir Rahmani", count: 40, rank: 3 },
//   { username: "Sobhan Mirzaie", count: 30, rank: 4 },
//   { username: "Mehdi Nedaie", count: 20, rank: 5 },
//   { username: "Mohammad Hoseini", count: 20, rank: 6 },
//   { username: "Mehdi Mohammadi", count: 20, rank: 7 },
//   { username: "Erfan Daie", count: 20, rank: 8 },
// ];

const LeaderBoard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<LeaderBoardItemType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await apiClient.get<ResType<LeaderBoardItemType[]>>(
          "/Score/GetLeaderBoard"
        );

        const { data, isSuccess } = response.data;

        if (isSuccess) {
          setItems(data);
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="p-6">
      <BackButton />

      <RankOne loading={loading} user={items[0]} />

      <div className="flex flex-col gap-2">
        {loading
          ? [...Array(4)].map((_, index) => (
              <CustomSkeleton
                key={index}
                variant="rectangular"
                height="5rem"
                borderRadius="1rem"
              />
            ))
          : items.slice(1).map((item, index) => (
              <UserItem
                key={index}
                username={item.username}
                count={item.score}
                rank={index + 2}
              />
            ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
