import Link from "next/link";
import Image from "./Image";
import { currentUser } from "@clerk/nextjs/server";
import Logout from "./Logout";
import {
  FaHome,
  FaSearch,
  FaBell,
  FaComment,
  FaBookmark,
  FaBriefcase,
  FaUsers,
  FaCrown,
  FaUser,
  FaEllipsisH,
} from "react-icons/fa";

const menuList = [
  { id: 1, name: "Home", link: "/", icon: <FaHome /> },
  { id: 2, name: "Explore", link: "/explore", icon: <FaSearch /> },
  { id: 3, name: "Notification", link: "/notifications", icon: <FaBell /> },
  { id: 4, name: "Messages", link: "/messages", icon: <FaComment /> },
  { id: 5, name: "Bookmarks", link: "/bookmarks", icon: <FaBookmark /> },

  { id: 6, name: "Profile", link: "/profile", icon: <FaUser /> },
];

const LeftBar = async () => {
  const user = await currentUser();

  return (
    <nav className="hidden 2xl:flex px-6 py-4 flex-row justify-between items-center w-full h-16 bg-[#5A04FF] mt-3">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center  ">
        <img
          src="/assets/icons/output.png"
          alt="Logo"
          width={170}
          height={36}
          className="mr-0 "
        />
      </Link>
      <Link
        href="/"
        className="flex items-center whitespace-nowrap bg-transparent border border-white/20 px-4 py-2 rounded-full relative"
      >
        <span className="text-sm text-white">Dive into fresh content</span>
      </Link>

      <div className="flex justify-evenly px-3">
        {/* Middle: Navigation Menu */}
        <ul className="flex gap-6 justify-center sm:gap-4 md:gap-6 ">
          {menuList.map((item) => (
            <li key={item.id} className="group">
              <Link
                href={item.link}
                className="flex bg-transparent border border-white/20 gap-4 items-center text-white hover:text-black transition text-sm sm:text-base md:text-lg rounded-full px-3 py-2"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Profile or Sign In */}
        <div className="flex gap-6 items-center bg-transparent border border-white/20 px-4 py-2 rounded-full relative">
          {user ? (
            <>
              <Link
                href={`/profile/${user.id}`}
                className="flex gap-3 items-center"
              >
                <img
                  src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                  alt="profile"
                  className="h-10 w-10 rounded-full"
                />
                <div className="hidden md:flex flex-col">
                  <p className="text-white font-semibold">{user.username}</p>
                  <p className="text-white text-sm">@{user.username}</p>
                </div>
              </Link>

              <div className="flex items-center gap-2 px-6 text-white hover:text-black transition-colors cursor-pointer">
                <img
                  src="/assets/icons/logout.svg"
                  alt="Logout"
                  className="h-5 w-5"
                />
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
      </div>
    </nav>
  );
};

export default LeftBar;
