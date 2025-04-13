import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const bio = formData.get("bio") as string;
  const img = formData.get("img") as File | null;
  const cover = formData.get("cover") as File | null;

  let imgUrl: string | undefined;
  let coverUrl: string | undefined;

  const saveFile = async (file: File, folder: string) => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(process.cwd(), "public", folder, file.name);
    await writeFile(filePath, buffer);
    return `/${folder}/${file.name}`;
  };

  if (img) imgUrl = await saveFile(img, "uploads");
  if (cover) coverUrl = await saveFile(cover, "uploads");

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      bio,
      ...(imgUrl && { img: imgUrl }),
      ...(coverUrl && { cover: coverUrl }),
    },
  });

  return NextResponse.json(updatedUser);
}
