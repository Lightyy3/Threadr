/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaImage,
  FaPoll,
  FaRegSmile,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { useActionState } from "react";
import { useUser } from "@clerk/nextjs";
import NextImage from "next/image";
import { addPost } from "@/action";
import ImageEditor from "./ImageEditor";

const Share = () => {
  const { user } = useUser();
  const [userImg, setUserImg] = useState<string | null>(null);
  const [media, setMedia] = useState<File | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [settings, setSettings] = useState<{
    type: "original" | "wide" | "square";
    sensitive: boolean;
  }>({
    type: "original",
    sensitive: false,
  });

  const [state, formAction, isPending] = useActionState(addPost, {
    success: false,
    error: false,
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setMedia(null);
      setSettings({ type: "original", sensitive: false });
    }
  }, [state]);

  useEffect(() => {
    const fetchUserImg = async () => {
      if (user?.id) {
        try {
          const response = await fetch(`/api/getUserImage?userId=${user.id}`);
          const data = await response.json();
          if (data.img) {
            setUserImg(data.img);
          }
        } catch (error) {
          console.error("Error fetching user image:", error);
        }
      }
    };

    fetchUserImg();
  }, [user]);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const previewURL = media ? URL.createObjectURL(media) : null;

  return (
    <form ref={formRef} className="p-4 flex gap-4" action={formAction}>
      {/* AVATAR */}
      <div className=" ">
        <img
          src={userImg || "/assets/icons/17.jpg"}
          alt="profile"
          className="h-10 w-10 rounded-full"
        />
      </div>

      {/* OTHERS */}
      <div className="flex-1 flex flex-col gap-4">
        <input
          type="text"
          name="imgType"
          value={settings.type}
          hidden
          readOnly
        />
        <input
          type="text"
          name="isSensitive"
          value={settings.sensitive ? "true" : "false"}
          hidden
          readOnly
        />
        <input
          type="text"
          name="desc"
          placeholder="What is happening?!"
          className="bg-transparent outline-none placeholder:text-white text-xl"
        />

        {/* PREVIEW IMAGE */}
        {media?.type.includes("image") && previewURL && (
          <div className="relative rounded-xl overflow-hidden">
            <NextImage
              src={previewURL}
              alt="Preview"
              width={600}
              height={600}
              className={`w-full ${
                settings.type === "original"
                  ? "h-full object-contain"
                  : settings.type === "square"
                  ? "aspect-square object-cover"
                  : "aspect-video object-cover"
              }`}
            />
            <div
              className="absolute top-2 left-2 bg-black bg-opacity-50 text-white py-1 px-4 rounded-full font-bold text-sm cursor-pointer"
              onClick={() => setIsEditorOpen(true)}
            >
              Edit
            </div>
            <div
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white h-8 w-8 flex items-center justify-center rounded-full cursor-pointer font-bold text-sm"
              onClick={() => setMedia(null)}
            >
              X
            </div>
          </div>
        )}

        {media?.type.includes("video") && previewURL && (
          <div className="relative">
            <video src={previewURL} controls />
            <div
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white h-8 w-8 flex items-center justify-center rounded-full cursor-pointer font-bold text-sm"
              onClick={() => setMedia(null)}
            >
              X
            </div>
          </div>
        )}

        {isEditorOpen && previewURL && (
          <ImageEditor
            onClose={() => setIsEditorOpen(false)}
            previewURL={previewURL}
            settings={settings}
            setSettings={setSettings}
          />
        )}

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-4 flex-wrap border border-white p-2 rounded-full">
            <input
              type="file"
              name="file"
              onChange={handleMediaChange}
              className="hidden"
              id="file"
              accept="image/*,video/*"
            />
            <label htmlFor="file">
              <FaImage className="cursor-pointer text-white" size={20} />
            </label>
            <FaPoll className="cursor-pointer text-white" size={20} />
            <FaRegSmile className="cursor-pointer text-white" size={20} />
            <FaClock className="cursor-pointer text-white" size={20} />
            <FaMapMarkerAlt className="cursor-pointer text-white" size={20} />
          </div>

          <button
            className="bg-white text-black font-bold rounded-full py-2 px-4 disabled:cursor-not-allowed"
            disabled={isPending}
          >
            {isPending ? "Posting" : "Post"}
          </button>

          {state.error && (
            <span className="text-red-300 p-4">Something went wrong!</span>
          )}
        </div>
      </div>
    </form>
  );
};

export default Share;
