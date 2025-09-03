"use client";

import { useEffect } from "react";

import BackButton from "@/components/back-button";
import { RankOne, UserItem } from "@/components/leader-board";
import { UserItemProps } from "@/components/leader-board/user-item/type";
import apiClient from "@/lib/axios";

const DATA: UserItemProps[] = [
  { username: "Shayan Sharifi", count: 50, rank: 2 },
  { username: "Amir Rahmani", count: 40, rank: 3 },
  { username: "Sobhan Mirzaie", count: 30, rank: 4 },
  { username: "Mehdi Nedaie", count: 20, rank: 5 },
  { username: "Mohammad Hoseini", count: 20, rank: 6 },
  { username: "Mehdi Mohammadi", count: 20, rank: 7 },
  { username: "Erfan Daie", count: 20, rank: 8 },
];

const LeaderBoard: React.FC = () => {
  useEffect(() => {
    (async () => {
      const response = await apiClient.get("/Score/GetLeaderBoard");
    })();
  }, []);

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
