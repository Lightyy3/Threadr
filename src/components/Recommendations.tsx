import Link from "next/link";

import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

const Recommendations = async () => {
  const { userId } = await auth();

  if (!userId) return;

  const followingIds = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });

  const followedUserIds = followingIds.map(
    (f: { followingId: any }) => f.followingId
  );

  const friendRecommendations = await prisma.user.findMany({
    where: {
      id: { not: userId, notIn: followedUserIds },
      followings: { some: { followerId: { in: followedUserIds } } },
    },
    take: 3,
    select: { id: true, displayName: true, username: true, img: true },
  });

  return (
    <div className="p-4 rounded-2xl border-[1px] border-white flex flex-col gap-4">
      {friendRecommendations.map(
        (person: {
          id: Key | null | undefined;
          displayName: any;
          username:
            | string
            | number
            | bigint
            | boolean
            | ReactElement<unknown, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | Promise<
                | string
                | number
                | bigint
                | boolean
                | ReactPortal
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | null
                | undefined
              >
            | null
            | undefined;
        }) => (
          <div className="flex items-center justify-between" key={person.id}>
            {/* IMAGE AND USER INFO */}
            <div className="flex items-center gap-2">
              <div className="relative rounded-full overflow-hidden w-10 h-10">
                <Image
                  src="/assets/icons/17.jpg"
                  alt="Avatar"
                  width={100} // Set your desired width
                  height={100} // Set your desired height
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-md font-bold">
                  {person.displayName || person.username}
                </h1>
                <span className="text-textGray text-sm">
                  @{person.username}
                </span>
              </div>
            </div>
            {/* FOLLOW BUTTON */}
            <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">
              Follow
            </button>
          </div>
        )
      )}

      <Link href="/" className="text-white">
        Show More
      </Link>
    </div>
  );
};

export default Recommendations;
