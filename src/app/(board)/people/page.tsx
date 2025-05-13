/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import FollowButton from "@/components/FollowButton";
import Link from "next/link";
import { HiOutlineChatAlt2 } from "react-icons/hi";

export default async function ProfilePage() {
  const { userId } = await auth();
  if (!userId) return <div className="text-white">Unauthorized</div>;

  const users = await prisma.user.findMany({
    where: {
      NOT: { id: userId },
    },
    include: {
      followings: {
        where: { followerId: userId },
        select: { followingId: true },
      },
      followers: true,
    },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-white ">
      <header className=" justify-between items-center mb-12">
        <div>
          <h1 className="bg-clip-text text-xl py-2 mt-2 flex flex-1 font-bold mb-4 bg-transparent border border-white gap-4 items-center text-white hover:text-black transition  sm:text-base md:text-xl rounded-full px-3">
            Explore People
          </h1>
          <p className="text-white mt-2 text-lg">
            Discover interesting profiles to follow
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">
        {users.map((user: any) => {
          const isFollowed = user.followings.some(
            (f: { followingId: string }) => f.followingId === user.id
          );

          return (
            <div
              key={user.id}
              className="rounded-full overflow-hidden border border-white hover:border-[#5A04FF] transition-all duration-300 hover:shadow-md items-center bg-transparent p-8 relative"
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <img
                    src={user.img || "/assets/icons/17.jpg"}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <Link href={`/${user.username}`}>
                    <h2 className="text-lg font-semibold text-white hover:text-[#5A04FF]">
                      {user.displayName}
                    </h2>
                    <p className="text-sm text-white">@{user.username}</p>
                  </Link>
                </div>
              </div>

              {/* Bio */}
              <p className="mt-3 text-sm text-white line-clamp-2">
                {user.bio || "No bio available"}
              </p>

              {/* Stats + Follow */}
              <div className="mt-4 flex items-center justify-between text-xs p-2 text-white">
                <div className="flex gap-4 p-1">
                  <span>{user.followers.length} followers</span>
                  <span>{user.followings.length} following</span>
                </div>
                <FollowButton
                  userId={user.id}
                  isFollowed={isFollowed}
                  username={user.username}
                />
              </div>

              {/* Chat Link (only show if user is followed) */}
              {isFollowed && (
                <div className="mt-2 text-sm flex justify-center text-white">
                  <Link
                    href={`/chat/${user.id}`}
                    className="flex items-center gap-1 hover:underline"
                  >
                    <HiOutlineChatAlt2 className="text-lg" />
                    Chat
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
