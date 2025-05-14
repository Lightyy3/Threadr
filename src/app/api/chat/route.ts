import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/prisma"; // adjust if it's in another folder
import { NextResponse } from "next/server";
import { isBefore, subDays } from "date-fns";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();
  const prompt = body.prompt;

  if (!prompt) return new NextResponse("Prompt is required", { status: 400 });

  // Get user and handle token logic
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return new NextResponse("User not found", { status: 404 });

  // Reset tokens if needed
  if (isBefore(user.lastTokenReset, subDays(new Date(), 1))) {
    await prisma.user.update({
      where: { id: userId },
      data: { tokens: 10, lastTokenReset: new Date() },
    });
  }

  if (user.tokens <= 0) {
    return new NextResponse(JSON.stringify({ error: "Out of tokens" }), {
      status: 403,
    });
  }

  // Call Cohere API
  const cohereRes = await fetch("https://api.cohere.ai/generate", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "command-xlarge",
      prompt,
      max_tokens: 100,
    }),
  });

  const cohereData = await cohereRes.json();
  const botResponse = cohereData.text || "No response from AI";

  // Decrement token
  await prisma.user.update({
    where: { id: userId },
    data: {
      tokens: {
        decrement: 1,
      },
    },
  });

  return NextResponse.json({ text: botResponse });
}
