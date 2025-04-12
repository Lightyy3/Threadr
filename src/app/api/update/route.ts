import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await auth(); // Authenticate the user

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Parse the body of the request
  const { cover, img, bio } = await request.json();

  // Prepare the data to be updated based on the fields sent
  const updatedData: { cover?: string; img?: string; bio?: string } = {};

  if (cover) updatedData.cover = cover;
  if (img) updatedData.img = img;
  if (bio) updatedData.bio = bio;

  try {
    // Update the user record with the provided changes
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return new Response("Failed to update profile", { status: 500 });
  }
}
