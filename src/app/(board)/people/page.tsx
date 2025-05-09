/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import FollowButton from "@/components/FollowButton";
import Link from "next/link";
import { RiUserFollowLine } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsCalendar3 } from "react-icons/bs";

// Define the type for user data
type SimplifiedUser = {
  id: string;
  img: string | null;
  username: string;
  displayName: string;
  bio?: string;
  followers: any[];
  followings: { followingId: string }[];
  location?: string;
  createdAt: Date | string;
};

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
    <div className="max-w-7xl mx-auto px-4 py-8 text-white">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-white bg-clip-text">
            Explore People
          </h1>
          <p className="text-white mt-2 text-lg">
            Discover interesting profiles to follow
          </p>
        </div>
        <div className="relative">{/* Optional search bar */}</div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">
        {users
          .filter((user) => typeof user.id === "string") // Filter out invalid users
          .map((user: any) => {
            const isFollowed = user.followings.some(
              (f: { followingId: string }) => f.followingId === user.id
            );
            return (
              <div
                key={user.id}
                className=" rounded-full overflow-hidden border border-white hover:border-[#5A04FF] transition-all duration-300 hover:shadow-md   items-center bg-transparent  p-8 relative"
              >
                {/* Avatar + Name Row */}
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

                {/* Follow + Stats */}
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
              </div>
            );
          })}
      </div>
    </div>
  );
}
