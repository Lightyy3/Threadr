import Feed from "@/components/Feed";
import FollowButton from "@/components/FollowButton";
import Image from "@/components/Image";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io"; // Importing the modern back arrow icon
import { FaEllipsisH, FaSearch, FaComment, FaUserAlt } from "react-icons/fa"; // Importing relevant icons

const ModernDefaultAvatar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-user"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);
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

  console.log(userId);
  if (!user) return notFound();

  return (
    <div className="">
      {/* PROFILE TITLE */}
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 ">
        <Link href="/">
          {/* Using the IoIosArrowBack icon as the back button */}
          <IoIosArrowBack size={24} color="white" />
        </Link>
        <h1 className="font-bold text-lg">{user.displayName}</h1>
      </div>
      {/* INFO */}
      <div className="">
        {/* COVER & AVATAR CONTAINER */}
        <div className="relative w-full">
          {/* COVER */}
          <div className="w-full aspect-[3/1] relative">
            <Image
              path={user.cover || "general/noCover.png"}
              alt=""
              w={600}
              h={200}
              tr={true}
            />
          </div>
          {/* AVATAR */}
          <div className="w-1/5 aspect-square rounded-full overflow-hidden border-4 border-black bg-gray-300 absolute left-4 -translate-y-1/2">
            {/* Check if user has an image, else show the modern default avatar */}
            {user.img ? (
              <Image
                path={user.img}
                alt="User Avatar"
                w={100}
                h={100}
                tr={true}
              />
            ) : (
              <ModernDefaultAvatar />
            )}
          </div>
        </div>
        <div className="flex w-full items-center justify-end gap-2 p-2">
          <div className="flex gap-4">
            <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-white cursor-pointer">
              {/* Using the FaEllipsisH icon as the "more" button */}
              <FaEllipsisH size={20} color="white" />
            </div>
            <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-white cursor-pointer">
              {/* Using the FaSearch icon as the "explore" button */}
              <FaSearch size={20} color="white" />
            </div>
            <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-white cursor-pointer">
              {/* Using the FaComment icon as the "message" button */}
              <FaComment size={20} color="white" />
            </div>
          </div>
          {userId && (
            <FollowButton
              userId={user.id}
              isFollowed={!!user.followings.length}
              username={username}
            />
          )}
        </div>
        {/* USER DETAILS */}
        <div className="p-4 flex flex-col gap-2">
          {/* USERNAME & HANDLE */}
          <div className="">
            <h1 className="text-2xl font-bold">{user.displayName}</h1>
            <span className="text-white text-sm">@{user.username}</span>
          </div>
          {user.bio && <p>{user.bio}</p>}
          {/* JOB & LOCATION & DATE */}
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
          {/* FOLLOWINGS & FOLLOWERS */}
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
