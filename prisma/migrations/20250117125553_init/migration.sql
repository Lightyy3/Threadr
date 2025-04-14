-- CreateTable User
CREATE TABLE "User" (
    "id" VARCHAR(191) NOT NULL,
    "email" VARCHAR(191) NOT NULL,
    "username" VARCHAR(191) NOT NULL,
    "displayName" VARCHAR(191) NULL,
    "name" VARCHAR(191) NULL,
    "bio" VARCHAR(191) NULL,
    "location" VARCHAR(191) NULL,
    "job" VARCHAR(191) NULL,
    "website" VARCHAR(191) NULL,
    "img" VARCHAR(191) NULL,
    "cover" VARCHAR(191) NULL,

    CONSTRAINT "User_email_key" UNIQUE ("email"),
    CONSTRAINT "User_username_key" UNIQUE ("username"),
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable Post
CREATE TABLE "Post" (
    "id" SERIAL PRIMARY KEY,  -- PostgreSQL uses SERIAL for auto-increment
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Use TIMESTAMPTZ for timestamps with time zone
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "desc" VARCHAR(255) NULL,
    "img" VARCHAR(191) NULL,
    "video" VARCHAR(191) NULL,
    "isSensitive" BOOLEAN NOT NULL DEFAULT FALSE,
    "userId" VARCHAR(191) NOT NULL,
    "rePostId" INTEGER NULL,
    "parentPostId" INTEGER NULL
);

-- CreateTable Like
CREATE TABLE "Like" (
    "id" SERIAL PRIMARY KEY,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(191) NOT NULL,
    "postId" INTEGER NOT NULL
);

-- CreateTable SavedPosts
CREATE TABLE "SavedPosts" (
    "id" SERIAL PRIMARY KEY,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(191) NOT NULL,
    "postId" INTEGER NOT NULL
);

-- CreateTable Follow
CREATE TABLE "Follow" (
    "id" SERIAL PRIMARY KEY,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "followerId" VARCHAR(191) NOT NULL,
    "followingId" VARCHAR(191) NOT NULL
);

-- AddForeignKey for Post
ALTER TABLE "Post"
    ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey for Post rePostId
ALTER TABLE "Post"
    ADD CONSTRAINT "Post_rePostId_fkey" FOREIGN KEY ("rePostId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey for Post parentPostId
ALTER TABLE "Post"
    ADD CONSTRAINT "Post_parentPostId_fkey" FOREIGN KEY ("parentPostId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey for Like userId
ALTER TABLE "Like"
    ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey for Like postId
ALTER TABLE "Like"
    ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey for SavedPosts userId
ALTER TABLE "SavedPosts"
    ADD CONSTRAINT "SavedPosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey for SavedPosts postId
ALTER TABLE "SavedPosts"
    ADD CONSTRAINT "SavedPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey for Follow followerId
ALTER TABLE "Follow"
    ADD CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey for Follow followingId
ALTER TABLE "Follow"
    ADD CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
