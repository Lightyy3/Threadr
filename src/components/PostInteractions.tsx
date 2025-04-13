"use client";

import { likePost, rePost, savePost } from "@/action";
import { socket } from "@/socket";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useOptimistic, useState } from "react";
import { FaComment, FaRetweet, FaHeart, FaBookmark } from "react-icons/fa";

const PostInteractions = ({
  username,
  postId,
  count,
  isLiked,
  isRePosted,
  isSaved,
}: {
  username: string;
  postId: number;
  count: { likes: number; rePosts: number; comments: number };
  isLiked: boolean;
  isRePosted: boolean;
  isSaved: boolean;
}) => {
  const [state, setState] = useState({
    likes: count.likes,
    isLiked: isLiked,
    rePosts: count.rePosts,
    isRePosted,
    isSaved,
  });

  const { user } = useUser();

  const [optimisticCount, addOptimisticCount] = useOptimistic(
    state,
    (prev, type: "like" | "rePost" | "save") => {
      if (type === "like") {
        return {
          ...prev,
          likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
          isLiked: !prev.isLiked,
        };
      }
      if (type === "rePost") {
        return {
          ...prev,
          rePosts: prev.isRePosted ? prev.rePosts - 1 : prev.rePosts + 1,
          isRePosted: !prev.isRePosted,
        };
      }
      if (type === "save") {
        return {
          ...prev,
          isSaved: !prev.isSaved,
        };
      }
      return prev;
    }
  );

  const likeAction = async () => {
    if (!user) return;

    if (!optimisticCount.isLiked) {
      socket.emit("sendNotification", {
        receiverUsername: username,
        data: {
          senderUsername: user.username,
          type: "like",
          link: `/${username}/status/${postId}`,
        },
      });
    }

    addOptimisticCount("like");
    await likePost(postId);
    setState((prev) => ({
      ...prev,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
      isLiked: !prev.isLiked,
    }));
  };

  const rePostAction = async () => {
    if (!user) return;

    if (!optimisticCount.isRePosted) {
      socket.emit("sendNotification", {
        receiverUsername: username,
        data: {
          senderUsername: user.username,
          type: "rePost",
          link: `/${username}/status/${postId}`,
        },
      });
    }

    addOptimisticCount("rePost");
    await rePost(postId);
    setState((prev) => ({
      ...prev,
      rePosts: prev.isRePosted ? prev.rePosts - 1 : prev.rePosts + 1,
      isRePosted: !prev.isRePosted,
    }));
  };

  const saveAction = async () => {
    addOptimisticCount("save");
    await savePost(postId);
    setState((prev) => ({
      ...prev,
      isSaved: !prev.isSaved,
    }));
  };

  return (
    <div className="flex items-center justify-between gap-8  lg:gap-16 my-2 text-white">
      <div className="flex items-center justify-between flex-1">
        {/* COMMENTS */}
        <Link
          href={`/${username}/status/${postId}`}
          className="flex items-center gap-2 px-2 cursor-pointer group"
        >
          <FaComment
            size={14}
            className="fill-white group-hover:fill-iconBlue"
          />
          <span className="group-hover:text-iconBlue text-sm">
            {count.comments}
          </span>
        </Link>

        {/* REPOST */}
        <form action={rePostAction}>
          <button className="flex items-center px-2 gap-2 cursor-pointer group">
            <FaRetweet
              size={14}
              className={`${
                optimisticCount.isRePosted ? "fill-iconGreen" : "fill-white"
              } group-hover:fill-iconGreen`}
            />
            <span
              className={`${
                optimisticCount.isRePosted ? "text-iconGreen" : "text-white"
              } group-hover:text-iconGreen text-sm`}
            >
              {optimisticCount.rePosts}
            </span>
          </button>
        </form>

        {/* LIKE */}
        <form action={likeAction}>
          <button className="flex items-center gap-2 cursor-pointer group">
            <FaHeart
              size={14}
              className={`${
                optimisticCount.isLiked ? "fill-iconPink" : "fill-white"
              } group-hover:fill-iconPink`}
            />
            <span
              className={`${
                optimisticCount.isLiked ? "text-iconPink" : "text-white"
              } group-hover:text-iconPink text-sm`}
            >
              {optimisticCount.likes}
            </span>
          </button>
        </form>
      </div>

      {/* SAVE & SHARE */}
      <form action={saveAction} className="flex items-center gap-2">
        <button className="cursor-pointer group">
          <FaBookmark
            size={14}
            className={`${
              optimisticCount.isSaved ? "fill-iconBlue" : "fill-white"
            } group-hover:fill-iconBlue`}
          />
        </button>
        {/* <div className="cursor-pointer group">
          <FaShareAlt
            size={12}
            className="fill-white group-hover:fill-iconBlue"
          />
        </div> */}
      </form>
    </div>
  );
};

export default PostInteractions;
