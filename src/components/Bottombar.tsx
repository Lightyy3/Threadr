"use client";

import Link from "next/link";
import Image from "next/image";
import { FiEdit3, FiBookmark } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi";
import { FaBell, FaComments } from "react-icons/fa";

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
  // {
  //   id: 3,
  //   name: "Notification",
  //   link: "/notifications",
  //   icon: <FaBell />,
  // },
  {
    id: 6,
    name: "Chatbot",
    link: "/chatbot",
    icon: (
      <FaComments
        size={24}
        className="text-white group-hover:text-black transition-colors"
      />
    ),
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

const BottomBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 mt-8 z-50 flex justify-around items-center bg-[#5A04FF] border-t border-white h-16 px-4 text-white lg:hidden">
      {menuList.map((item) => (
        <Link
          key={item.id}
          href={item.link}
          className="flex flex-col items-center text-xs group hover:text-black transition"
        >
          <span className="text-lg">{item.icon}</span>
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default BottomBar;
