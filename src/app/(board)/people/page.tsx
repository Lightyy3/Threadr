import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import FollowButton from "@/components/FollowButton";
import Image from "next/image";
import Link from "next/link";
import { RiUserFollowLine } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsCalendar3 } from "react-icons/bs";

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
          <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-[#5A04FF] to-purple-500 bg-clip-text">
            Explore People
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Discover interesting profiles to follow
          </p>
        </div>
        <div className="relative">{/* Optional search bar */}</div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user) => {
          const isFollowed = user.followings.some(
            (f) => f.followingId === user.id
          );
          return (
            <div
              key={user.id}
              className="bg-[#1e1e1e]  rounded-xl overflow-hidden border border-[#2a2a2e] hover:border-[#5A04FF] transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {/* Cover Image */}
              <div className="h-32 bg-gradient-to-r from-[#5A04FF] to-purple-500 opacity-30"></div>

              <div className="p-6">
                <div className="flex justify-between items-center">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#1e1e1e] -mt-12">
                    <Image
                      src={user.img || "/general/noAvatar.png"}
                      alt={user.displayName || "User"}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>

                  {/* Follow Button */}
                  <FollowButton
                    userId={user.id}
                    isFollowed={isFollowed}
                    username={user.username}
                  />
                </div>

                {/* User Info */}
                <div className="mt-4">
                  <Link href={`/${user.username}`}>
                    <h2 className="text-2xl font-bold text-white hover:text-[#5A04FF] transition-colors">
                      {user.displayName}
                    </h2>

                    <p className="text-sm text-gray-400">@{user.username}</p>
                  </Link>
                </div>

                {/* Bio */}
                <p className="mt-4 text-sm text-gray-300 line-clamp-3">
                  {user.bio || "No bio available"}
                </p>

                {/* Stats */}
                <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <RiUserFollowLine size={18} />
                    <span>{user.followers.length} followers</span>
                    <span>{user.followings.length} following</span>
                  </div>
                  {user.location && (
                    <div className="flex items-center gap-2">
                      <HiOutlineLocationMarker size={18} />
                      <span>{user.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <BsCalendar3 size={16} />
                    <span>
                      Joined{" "}
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
