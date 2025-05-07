/* eslint-disable react/no-unescaped-entities */
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import Post from "@/components/Post";

export interface PostWithDetails {
  id: number;
  img: string | null;
  createdAt: Date;
  updatedAt: Date;
  desc: string | null;
  imgHeight: number | null;
  video: string | null;
  isSensitive: boolean;
  userId: string;
  rePostId: number | null;
  parentPostId: number | null;
  user: {
    username: string;
    displayName: string;
    img: string;
  };
  likes: { id: number }[];
  rePosts: { id: number }[];
  saves: { id: number }[];
  _count: {
    likes: number;
    rePosts: number;
    comments: number;
  };
  rePost?: PostWithDetails | null;
}

const SavedPostsPage = async () => {
  const { userId } = await auth();
  if (!userId) return <div className="text-white">Unauthorized</div>;

  const savedPosts = await prisma.savedPosts.findMany({
    where: { userId },
    select: {
      id: true,
      post: {
        include: {
          user: {
            select: {
              username: true,
              displayName: true,
              img: true,
            },
          },
          likes: { select: { id: true } },
          rePosts: { select: { id: true } },
          saves: { select: { id: true } },
          _count: {
            select: {
              likes: true,
              rePosts: true,
              comments: true,
            },
          },
          rePost: {
            include: {
              user: {
                select: {
                  username: true,
                  displayName: true,
                  img: true,
                },
              },
              likes: { select: { id: true } },
              rePosts: { select: { id: true } },
              saves: { select: { id: true } },
              _count: {
                select: {
                  likes: true,
                  rePosts: true,
                  comments: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-white">
      <header className="mb-8">
        <h1 className="text-3xl text-white font-bold">Saved Posts</h1>
        <p className="text-white mt-1">All your saved posts</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedPosts.length === 0 ? (
          <div className="text-center text-gray-400 col-span-full">
            You haven't saved any posts yet.
          </div>
        ) : (
          savedPosts.map((savedPost) => (
            <div
              key={savedPost.id}
              className="bg-[#3A00B6] rounded-xl overflow-hidden border border-black transition-all duration-300 h-[500px] flex flex-col"
            >
              <div className="overflow-y-auto px-4 py-3 flex-1">
                <Post
                  post={savedPost.post as unknown as PostWithDetails}
                  type="comment"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedPostsPage;
