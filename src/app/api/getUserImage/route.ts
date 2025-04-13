// app/api/getUserImage/route.ts
import { prisma } from "@/prisma"; // Import your Prisma instance
import { NextResponse } from "next/server";

// The API route to get user image
export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId"); // Get userId from query parameters

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { img: true }, // Only fetching the image
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ img: user.img }); // Send the image back in response
  } catch (error) {
    console.error("Error fetching user image:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
