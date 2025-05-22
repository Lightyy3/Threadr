// src/lib/tokens.ts
import { prisma } from "@/prisma";
import { isBefore, subDays } from "date-fns";

export async function getOrResetTokens(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  const resetNeeded = isBefore(user.lastTokenReset, subDays(new Date(), 1));

  if (resetNeeded) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        tokens: 10,
        lastTokenReset: new Date(),
      },
    });
  }

  return user;
}

export async function decrementToken(userId: string) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      tokens: {
        decrement: 1,
      },
    },
  });

  return user.tokens;
}

export async function addTokens(userId: string, amount: number) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      tokens: {
        increment: amount,
      },
    },
  });

  return user.tokens;
}
