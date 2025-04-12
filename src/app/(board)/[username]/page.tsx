/* eslint-disable @typescript-eslint/no-explicit-any */
import ProfileEditor from "../../../components/Profileeditor"; // Import the new ProfileEditor component
import Feed from "@/components/Feed";
import FollowButton from "@/components/FollowButton";
import Image from "@/components/Image";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io"; // Importing the modern back arrow icon
import { FaEllipsisH, FaSearch, FaComment } from "react-icons/fa"; // Importing relevant icons

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { userId } = await auth();

  const username = (await params).username;

  const user = await prisma.user.findUnique({
    where: { username: username },
    include: {
      _count: { select: { followers: true, followings: true } },
      followings: userId ? { where: { followerId: userId } } : undefined,
    },
  });

  if (!user) return notFound();

  const isCurrentUser = userId === user.id;

  return (
    <div>
      {/* PROFILE TITLE */}
      <div className="flex items-center gap-4 sticky top-0 backdrop-blur-md p-4 z-10">
        <Link href="/" className="flex items-center gap-2">
          <IoIosArrowBack size={24} color="white" />
          <p className="font-bold text-lg">Back</p>
        </Link>
        <h1 className="font-bold text-lg text-white">{user.displayName}</h1>
      </div>

      {/* INFO */}
      <div>
        {/* PROFILE EDITOR */}
        <ProfileEditor user={user} isCurrentUser={isCurrentUser} />

        {/* USER DETAILS */}
        <div className="p-4 flex flex-col gap-2">
          <div className="">
            <h1 className="text-2xl font-bold">{user.displayName}</h1>
            <span className="text-white text-sm">@{user.username}</span>
          </div>

          <div className="flex gap-4 text-white text-[15px]">
            <div className="flex items-center gap-2">
              <span>
                Date Joined:{" "}
                {new Date(user.createdAt.toString()).toLocaleDateString(
                  "en-US",
                  { month: "long", year: "numeric" }
                )}
              </span>
            </div>
          </div>

          {/* Display Bio if available */}
          {user.bio && (
            <div className="mt-4 text-white text-[15px]">
              <h2 className="font-semibold">Bio:</h2>
              <p>{user.bio}</p>
            </div>
          )}

          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold">{user._count.followers}</span>
              <span className="text-white text-[15px]">Followers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{user._count.followings}</span>
              <span className="text-white text-[15px]">Followings</span>
            </div>
          </div>
        </div>
      </div>

      {/* FEED */}
      <Feed userProfileId={user.id} />
    </div>
  );
};

export default UserPage;
