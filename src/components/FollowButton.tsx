"use client";

import { followUser } from "@/action";
import { useUser } from "@clerk/nextjs";
import { useOptimistic, useState } from "react";

const FollowButton = ({
  userId,
  isFollowed,
}: {
  userId: string;
  isFollowed: boolean;
  username: string;
}) => {
  const [state, setState] = useState(isFollowed);

  const { user } = useUser();

  const [optimisticFollow, switchOptimisticFollow] = useOptimistic(
    state,
    (prev) => !prev
  );

  if (!user) return null;

  const followAction = async () => {
    switchOptimisticFollow("");
    await followUser(userId);
    setState((prev) => !prev);
  };

  return (
    <form action={followAction}>
      <button className="py-2 px-4 bg-white text-black font-bold rounded-full">
        {optimisticFollow ? "Unfollow" : "Follow"}
      </button>
    </form>
  );
};

export default FollowButton;
