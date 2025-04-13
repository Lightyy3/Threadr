import React from "react";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import ProfileEditor from "@/components/Profileeditor";

export default async function EditPage() {
  const { userId } = await auth();

  if (!userId) return <div className="text-white">Unauthorized</div>;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
    },
  });

  if (!user) return notFound();

  const isCurrentUser = userId === user.id;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 text-white">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
      <ProfileEditor user={user} isCurrentUser={isCurrentUser} />
    </div>
  );
}
