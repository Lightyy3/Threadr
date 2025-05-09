/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ProfileEditorProps {
  user: any;
  isCurrentUser: boolean;
}

export default function ProfileEditor({ isCurrentUser }: ProfileEditorProps) {
  const [bio, setBio] = useState("");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState("");
  const [previewCover, setPreviewCover] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data = await res.json();
        setBio(data.bio || "");
        setPreviewImg(data.img || "");
        setPreviewCover(data.cover || "");
        setUsername(data.username || ""); // Fetch username
        setDisplayName(data.displayName || ""); // Fetch display name
      }
    };
    fetchUserData();
  }, []);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "img" | "cover"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      type === "img"
        ? (setImgFile(file), setPreviewImg(previewURL))
        : (setCoverFile(file), setPreviewCover(previewURL));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("bio", bio);
    if (imgFile) formData.append("img", imgFile);
    if (coverFile) formData.append("cover", coverFile);

    const res = await fetch("/api/update-profile", {
      method: "POST",
      body: formData,
    });

    if (res.ok) window.location.reload();
    else alert("Something went wrong!");
  };

  if (!isCurrentUser) return null;

  return (
    <div className="max-w-2xl mx-auto mt-10 border border-white rounded-xl shadow-xl overflow-hidden mb-8">
      {/* Cover Image */}
      <div className="relative h-40">
        {previewCover && (
          <Image src={previewCover} alt="Cover" fill className="object-cover" />
        )}
        <label className="absolute bottom-3 right-3 text-xs text-white border border-white font-semibold px-3 py-1 rounded-full cursor-pointer shadow hover:opacity-90">
          Change Cover
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "cover")}
            className="hidden"
          />
        </label>
      </div>
      <hr className="border-t border-white my-6" />

      {/* Avatar & Form */}
      <div className="relative px-6 pb-8 pt-16 text-white">
        {/* Avatar */}
        <div className="absolute -top-12 left-6 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
          {previewImg && (
            <Image
              src={previewImg}
              alt="Profile"
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          )}
        </div>

        {/* Change Avatar Button */}
        <div className="flex justify-end mb-4">
          <label className="text-white border border-white text-sm px-4 py-1 rounded-full cursor-pointer hover:opacity-90">
            Change Avatar
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "img")}
              className="hidden"
            />
          </label>
        </div>

        {/* Username and Display Name */}
        <div className="mb-6">
          <p className="text-sm text-white">@{username}</p> {/* Username */}
        </div>

        {/* White Line Between Sections */}
        <hr className="border-t border-white my-6" />

        {/* Bio Field */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-white mb-2">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Tell people about yourself..."
            className="w-full p-3 text-sm rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#5A04FF] bg-white placeholder:text-gray-400"
          />
        </div>

        {/* Save Button */}
        <div className="text-right">
          <button
            onClick={handleSubmit}
            className="text-white border border-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
