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
          user: { select: { username: true, displayName: true, img: true } },
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
                select: { username: true, displayName: true, img: true },
              },
              likes: { select: { id: true } },
              rePosts: { select: { id: true } },
              saves: { select: { id: true } },
              _count: {
                select: { likes: true, rePosts: true, comments: true },
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
    <div className="max-w-4xl mx-auto px-4 py-6 text-white mb-16">
      <h1 className="text-2xl font-semibold mb-4">Saved Posts</h1>

      {savedPosts.length === 0 ? (
        <div className="text-center text-white">No saved posts yet.</div>
      ) : (
        <div className="space-y-4">
          {savedPosts.map((savedPost) => (
            <div
              key={savedPost.id}
              className=" rounded-3xl overflow-hidden border border-white shadow-md"
            >
              <Post
                post={savedPost.post as unknown as PostWithDetails}
                type="comment"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPostsPage;
