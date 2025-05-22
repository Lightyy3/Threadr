import { prisma } from "@/prisma";
import { isBefore, subDays } from "date-fns";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { getOrResetTokens } from "../../../../lib/tokens";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const user = await getOrResetTokens(userId);
  return NextResponse.json({ tokens: user.tokens });
}
