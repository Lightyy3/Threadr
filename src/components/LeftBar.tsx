import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import Logout from "./Logout";
import Image from "next/image";

import { FiEdit3 } from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi";
import { FaBell } from "react-icons/fa";
import { prisma } from "@/prisma";

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
  const user = await currentUser(); // Clerk's current user (provides userID)

  if (!user) return null; // If no user, don't render the LeftBar.

  // Fetch the user data from the database using Prisma based on the logged-in user's ID
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id }, // Use the Clerk user ID to fetch from your database
    select: { img: true, username: true }, // Select the fields you need, e.g., imageUrl
  });

  if (!dbUser) return null; // If user not found in the database, return null

  return (
    <nav className="2xl:flex px-6 py-4 flex-row justify-between items-center w-full h-16 bg-[#5A04FF] mt-3">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/assets/icons/output.png"
          alt="Logo"
          width={170}
          height={36}
          style={{ minWidth: "170px", minHeight: "36px" }} // Force minimum dimensions
        />
      </Link>

      {/* Middle: Navigation Menu */}
      <ul className="flex gap-6 justify-center sm:gap-4 md:gap-6 mr-5 ">
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

      {/* Right: Profile or Sign In */}
      <div className="flex gap-6 items-center bg-transparent border border-white px-4 py-2 rounded-full relative">
        {dbUser ? (
          <>
            <Link
              href={`/${dbUser.username}`}
              className="flex gap-3 items-center"
            >
              <Image
                src={dbUser.img || "/default-profile.jpg"} // fallback if dbUser.img is empty
                alt="profile"
                width={40} // corresponds to h-10
                height={40} // corresponds to w-10
                className="rounded-full"
              />

              <div className="hidden md:flex flex-col">
                <p className="text-white font-semibold">{dbUser.username}</p>
                <p className="text-white text-sm">@{dbUser.username}</p>
              </div>
            </Link>

            <div className="flex items-center gap-2 px-6 ml-5 text-white hover:text-black transition-colors cursor-pointer">
              {/* <img
                src="/assets/icons/logout.svg"
                alt="Logout"
                className="h-5 w-5"
              /> */}
              <Logout />
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
