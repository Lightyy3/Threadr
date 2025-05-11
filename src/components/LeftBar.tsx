/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

import { FiEdit3, FiBookmark } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi";
import { FaBell } from "react-icons/fa";
import { prisma } from "@/prisma";
import LogoutWrapper from "./Logoutwrapper";

const menuList = [
  {
    id: 1,
    name: "Home",
    link: "/",
    icon: (
      <Image
        src="/assets/icons/home2.svg"
        alt="Home Icon"
        width={24}
        height={24}
        style={{ minWidth: "24px", minHeight: "24px" }}
      />
    ),
  },
  {
    id: 3,
    name: "Notification",
    link: "/notifications",
    icon: <FaBell />,
  },
  {
    id: 4,
    name: "Edit",
    link: "/edit",
    icon: <FiEdit3 />,
  },
  {
    id: 5,
    name: "Saved",
    link: "/saved",
    icon: (
      <FiBookmark
        size={24}
        className="text-white group-hover:text-black transition-colors"
      />
    ),
  },
  {
    id: 6,
    name: "People",
    link: "/people",
    icon: (
      <HiOutlineUsers
        size={24}
        className="text-white group-hover:text-black transition-colors"
      />
    ),
  },
];

const LeftBar = async () => {
  const user = await currentUser();

  const dbUser = user
    ? await prisma.user.findUnique({
        where: { id: user.id },
        select: { img: true, username: true },
      })
    : null;

  return (
    <nav className="hidden lg:flex px-12 py-4 flex-row justify-between items-center w-full h-16 bg-[#5A04FF] mt-3">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/assets/icons/output.png"
          alt="Logo"
          width={170}
          height={36}
          style={{ minWidth: "170px", minHeight: "36px" }}
        />
      </Link>

      {/* Navigation */}
      <ul className="flex gap-6 justify-center sm:gap-4 md:gap-6 mr-5">
        {menuList.map((item) => (
          <li key={item.id} className="group">
            <Link
              href={item.link}
              className="flex bg-transparent border border-white gap-4 items-center text-white hover:text-black transition text-sm sm:text-base md:text-lg rounded-full px-3 py-2"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="hidden sm:inline">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Profile */}
      <div className="flex gap-3 items-center bg-transparent border border-white px-4 py-2 rounded-full relative">
        {dbUser ? (
          <>
            <Link
              href={`/${dbUser.username}`}
              className="flex items-center gap-[2px]"
            >
              <img
                src={dbUser.img || "/assets/icons/17.jpg"}
                alt="profile"
                className="h-10 w-10 rounded-full"
              />
              <div className="hidden lg:flex flex-col">
                <p className="text-white font-semibold">{dbUser.username}</p>
                <p className="text-white text-sm">@{dbUser.username}</p>
              </div>
            </Link>
            <div className="flex items-center gap-8 px-9 ml-9 text-white hover:text-black transition-colors cursor-pointer">
              <LogoutWrapper />
            </div>
          </>
        ) : (
          <Link
            href="/sign-in"
            className="bg-white text-black rounded-full font-bold py-2 px-6 hover:bg-white/80 transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default LeftBar;
