/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable no-unused-vars */

import Link from "next/link";
import Logout from "./Logout"; // client-side logout button
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/prisma";

const UserProfileMenuMobile = async () => {
  const user = await currentUser();

  const dbUser = user
    ? await prisma.user.findUnique({
        where: { id: user.id },
        select: { img: true, username: true },
      })
    : null;

  return (
    <div className="flex items-center px-4 text-white gap-6  bg-transparent border border-white  py-2 rounded-full relative">
      <Link href={`/${dbUser?.username}`} className="flex items-center gap-3">
        <img
          src={dbUser?.img || "/assets/icons/17.jpg"}
          alt="profile"
          className="h-10 w-10 rounded-full"
        />
        <span className="text-sm font-semibold">@{dbUser?.username}</span>
      </Link>
      <Logout />
    </div>
  );
};

export default UserProfileMenuMobile;
