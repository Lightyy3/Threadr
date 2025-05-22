import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { decrementToken } from "../../../../../lib/tokens";

export async function POST() {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const tokens = await decrementToken(userId);

    if (tokens < 0) {
      return new NextResponse("Out of tokens", { status: 403 });
    }

    return NextResponse.json({ tokens });
  } catch (error) {
    return new NextResponse("Insufficient tokens", { status: 403 });
  }
}
