import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import Feed from "@/components/Feed";
import AllPostsFeed from "@/components/AllPostsFeed";
import Share from "@/components/Share";
import { notFound } from "next/navigation";

const Homepage = async ({
  searchParams,
}: {
  searchParams: { feed: string };
}) => {
  // Get the authenticated user
  const { userId } = await auth();

  if (!userId) {
    return <div>You need to log in to view your feed</div>;
  }

  // Determine the feed type from the query parameter
  const feedType = searchParams.feed || "forYou"; // Default to "forYou" feed if no query param is given

  return (
    <div className="homepage">
      <div className="bg-[#5A04FF] px-4 pt-4 flex justify-evenly text-white font-bold border-b-[1px] border-white">
        {/* For You Button */}
        <LinkButton feedType="forYou" currentFeed={feedType} />
        {/* Following Button */}
        <LinkButton feedType="following" currentFeed={feedType} />
      </div>

      <Share />

      {/* Conditional Feed Rendering */}
      {feedType === "forYou" ? (
        <AllPostsFeed /> // Show the "For you" feed (all posts)
      ) : (
        <Feed /> // Show the "Following" feed
      )}
    </div>
  );
};

// Link Button Component to handle feed switching
const LinkButton = ({
  feedType,
  currentFeed,
}: {
  feedType: string;
  currentFeed: string;
}) => (
  <a
    href={`/?feed=${feedType}`}
    className={`pb-3 flex items-center ${
      currentFeed === feedType ? "border-b-4 border-white" : ""
    }`}
  >
    {feedType === "forYou" ? "For You" : "Following"}
  </a>
);

export default Homepage;
