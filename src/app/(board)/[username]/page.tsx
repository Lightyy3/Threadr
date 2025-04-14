// ./src/app/user/[username]/page.tsx

import Feed from "@/components/Feed";
import FollowButton from "@/components/FollowButton";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { Prisma } from "@prisma/client";

type UserWithFollowData = Prisma.UserGetPayload<{
  include: {
    _count: true;
    followings: true;
  };
}>;

const UserPage = async ({ params }: { params: { username: string } }) => {
  const { userId } = await auth();
  const { username } = params;

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
          likes: true,
          saves: true,
        },
      },
      followings: userId ? { where: { followerId: userId } } : undefined,
    },
  });

  if (!user) return notFound();
  const isCurrentUser = userId === user.id;

  return (
    <div className="text-white">
      {/* Top Bar */}
      <div className="flex items-center gap-4 sticky top-0 backdrop-blur-md p-4 z-10">
        <Link href="/" className="flex items-center gap-2">
          <IoIosArrowBack size={24} color="white" />
          <p className="font-bold text-lg">Back</p>
        </Link>
        <h1 className="font-bold text-lg">{user.displayName}</h1>
      </div>

      {/* Cover Photo */}
      <div className="relative h-52 bg-gray-800">
        {user.cover && (
          <Image src={user.cover} alt="Cover" fill className="object-cover" />
        )}

        {/* Profile Picture */}
        <div className="absolute -bottom-16 left-6 w-32 h-32 rounded-full overflow-hidden border-4 border-black shadow-lg bg-gray-900">
          <Image
            src={user.img || "/assets/icons/profile-placeholder.svg"}
            alt="Profile"
            fill
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Main Info */}
      <div className="mt-20 px-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{user.displayName}</h1>
            <p className="text-sm text-white">@{user.username}</p>
          </div>
          {isCurrentUser ? (
            <Link
              href="/edit"
              className="flex items-center gap-2 text-sm text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition"
            >
              <FaEdit size={16} />
              Edit
            </Link>
          ) : (
            <FollowButton
              userId={user.id}
              isFollowed={user.followings.some((f) => f.followingId === userId)}
              username={user.username}
            />
          )}
        </div>

        {/* Bio */}
        {user.bio && (
          <div className="mt-4 text-sm text-white">
            <p>Bio: {user.bio}</p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-4 flex gap-6 text-sm text-white">
          <div>
            <span className="font-bold text-white">
              {user._count.followers}
            </span>{" "}
            Followers
          </div>
          <div>
            <span className="font-bold text-white">
              {user._count.followings}
            </span>{" "}
            Following
          </div>
          <div>
            Joined{" "}
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="mt-8 px-6">
        <Feed userProfileId={user.id} />
      </div>
    </div>
  );
};

export default UserPage;
