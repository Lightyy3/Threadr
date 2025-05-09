import { auth } from "@clerk/nextjs/server";
import Feed from "@/components/Feed";
import AllPostsFeed from "@/components/AllPostsFeed";
import Share from "@/components/Share";
import Link from "next/link";

interface HomepageProps {
  searchParams?: Promise<{
    feed?: string;
  }>;
}

const Homepage = async ({ searchParams }: HomepageProps) => {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="text-white text-center mt-10">
        You need to log in to view your feed
      </div>
    );
  }

  const resolvedSearchParams = await searchParams;
  const feedType =
    resolvedSearchParams?.feed === "following" ? "following" : "forYou";

  return (
    <div className="">
      {/* Feed Type Tabs */}
      <div className="bg-[#5A04FF] px-4 pt-4 flex justify-evenly text-white font-bold border-b border-white">
        <LinkButton feedType="forYou" currentFeed={feedType} />
        <LinkButton feedType="following" currentFeed={feedType} />
      </div>

      {/* Share Box */}
      <Share />

      {/* Feed Content */}
      {feedType === "forYou" ? <AllPostsFeed /> : <Feed />}
    </div>
  );
};

export default Homepage;

// Reusable tab button using Next.js Link
const LinkButton = ({
  feedType,
  currentFeed,
}: {
  feedType: string;
  currentFeed: string;
}) => (
  <Link
    href={`/?feed=${feedType}`}
    className={`pb-3 px-2 flex items-center transition ${
      currentFeed === feedType ? "border-b-4 border-white" : ""
    }`}
  >
    {feedType === "forYou" ? "For You" : "Following"}
  </Link>
);
