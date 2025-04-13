"use client";

import { useClerk } from "@clerk/nextjs";

import { useState } from "react";
import { FiLogOut } from "react-icons/fi";

const Logout = () => {
  const [open, setOpen] = useState(false);
  const { signOut } = useClerk();

  return (
    <div className="hidden xxl:block relative text-white">
      <div
        className="cursor-pointer font-semibold flex items-center gap-2 hover:text-gray-300 transition"
        onClick={() => setOpen((prev) => !prev)}
      >
        <FiLogOut size={20} />
        Logout
      </div>

      {open && (
        <div className="absolute top-10 left-0 bg-white text-black shadow-lg rounded-md p-3 min-w-[150px] z-50 animate-fadeIn">
          <p className="text-sm mb-2">Are you sure?</p>
          <button
            className="w-full text-center px-4 py-2 bg-red-500 hover:bg-red-600 text-black rounded-md transition"
            onClick={() => signOut()}
          >
            Confirm Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Logout;
