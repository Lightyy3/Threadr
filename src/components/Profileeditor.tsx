/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Ensure this is only run on the client

import { useState, useEffect } from "react";

// Default avatar component
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

const ProfileEditor = ({ user, isCurrentUser }: any) => {
  const [bio, setBio] = useState(user.bio || "");
  const [coverImage, setCoverImage] = useState(user.cover || "");
  const [profileImage, setProfileImage] = useState(user.img || "");

  // State for holding updated user data
  const [updatedUser, setUpdatedUser] = useState(user);

  // State to track if the component has mounted
  const [mounted, setMounted] = useState(false);

  // Delay the usage of `useRouter` to ensure it's only called after component mounts (client-side only)
  useEffect(() => {
    setMounted(true); // Mark the component as mounted
  }, []);

  // Handle Profile Update logic
  const handleProfileUpdate = async (updatedData: any) => {
    try {
      const response = await fetch("/api/update", {
        method: "POST", // Use POST instead of PUT (according to your API design)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        // Update the user data with the new values if the request was successful
        const newUser = { ...updatedUser, ...updatedData };
        setUpdatedUser(newUser); // Update the state with the new user data
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Handle image selection
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cover" | "avatar"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "cover") {
          setCoverImage(reader.result as string); // Update cover image state
          handleProfileUpdate({ cover: reader.result });
        } else {
          setProfileImage(reader.result as string); // Update profile image state
          handleProfileUpdate({ img: reader.result });
        }
      };
      reader.readAsDataURL(file); // Read file as data URL
    }
  };

  // Prevent the component from rendering until it's mounted
  if (!mounted) return null;

  return (
    <div className="relative">
      {/* COVER */}
      <div className="w-full aspect-[3/1] relative">
        <img
          src={updatedUser.cover || "general/noCover.png"}
          alt="Cover Image"
          className="w-full h-full object-cover"
        />
        {isCurrentUser && (
          <button
            className="absolute top-2 right-4 bg-blue-500 text-white p-2 rounded-md z-10"
            onClick={() => document.getElementById("coverInput")?.click()} // Trigger the file input click
          >
            Change Cover
          </button>
        )}
        <input
          id="coverInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleImageChange(e, "cover")}
        />
      </div>

      {/* AVATAR */}
      <div className="relative w-1/5 aspect-square rounded-full overflow-hidden border-4 border-black bg-gray-300 absolute left-4 -translate-y-1/2 z-10">
        {updatedUser.img ? (
          <img
            src={updatedUser.img}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <ModernDefaultAvatar />
        )}
        {isCurrentUser && (
          <button
            className="absolute bottom-2 right-4 bg-blue-500 text-white p-2 rounded-md z-10"
            onClick={() => document.getElementById("avatarInput")?.click()} // Trigger the file input click
          >
            Change Avatar
          </button>
        )}
        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleImageChange(e, "avatar")}
        />
      </div>

      {/* Editable Bio */}
      {isCurrentUser ? (
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Edit your bio"
          className="w-full p-2 border border-gray-300 rounded-md mt-4"
        />
      ) : (
        <p>{updatedUser.bio}</p>
      )}

      {/* Save Bio Button */}
      {isCurrentUser && (
        <button
          onClick={() => handleProfileUpdate({ bio })}
          className="mt-4 bg-blue-500 text-white p-2 rounded-md"
        >
          Save Bio
        </button>
      )}
    </div>
  );
};

export default ProfileEditor;
