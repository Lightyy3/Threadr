import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { receiverId, content } = body;

  const message = await prisma.message.create({
    data: {
      senderId: userId,
      receiverId,
      content,
    },
  });

  return NextResponse.json({ message });
}
