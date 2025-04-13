/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ProfileEditorProps {
  user: any;
  isCurrentUser: boolean;
}

export default function ProfileEditor({
  user,
  isCurrentUser,
}: ProfileEditorProps) {
  const [bio, setBio] = useState("");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState("");
  const [previewCover, setPreviewCover] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data = await res.json();
        setBio(data.bio || "");
        setPreviewImg(data.img || "");
        setPreviewCover(data.cover || "");
      } else {
        console.error("Failed to fetch user data");
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
      if (type === "img") {
        setImgFile(file);
        setPreviewImg(URL.createObjectURL(file));
      } else {
        setCoverFile(file);
        setPreviewCover(URL.createObjectURL(file));
      }
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

    if (res.ok) {
      window.location.reload();
    } else {
      alert("Something went wrong!");
    }
  };

  if (!isCurrentUser) return null;

  return (
    <div className="max-w-3xl mx-auto bg-[#1e1e1e] rounded-xl shadow-lg overflow-hidden mb-10">
      {/* COVER */}
      <div className="relative h-40 bg-gray-800">
        {previewCover && (
          <Image
            src={previewCover}
            alt="Cover"
            fill
            className="object-cover w-full h-full"
          />
        )}
        <div className="absolute bottom-2 right-2">
          <label className="cursor-pointer text-sm bg-white text-black px-3 py-1 rounded hover:bg-gray-200">
            Change Cover
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "cover")}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* PROFILE PIC + FORM */}
      <div className="p-6 relative pt-16">
        {/* Profile Picture */}
        <div className="absolute -top-12 left-6 w-24 h-24 rounded-full border-4 border-[#1e1e1e] overflow-hidden shadow-md">
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

        <div className="flex justify-end mb-6">
          <label className="cursor-pointer text-sm bg-white text-black px-3 py-1 rounded hover:bg-gray-200">
            Change Avatar
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "img")}
              className="hidden"
            />
          </label>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <label className="block text-white text-sm font-semibold mb-2">
            Bio
          </label>
          <textarea
            className="w-full p-3 text-sm rounded-lg bg-[#2a2a2e] text-white outline-none border border-transparent focus:border-[#5A04FF]"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Tell people about yourself..."
          />
        </div>

        {/* Save Button */}
        <div className="text-right">
          <button
            onClick={handleSubmit}
            className="bg-[#5A04FF] hover:bg-purple-700 transition text-white px-6 py-2 rounded-full font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
