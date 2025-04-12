import Feed from "@/components/Feed";
import Share from "@/components/Share";
import Link from "next/link";

const Homepage = () => {
  // const users = prisma.user.findMany()
  return (
    <div className="">
      <div className="bg-[#5A04FF] px-4 pt-4 flex justify-evenly text-white font-bold border-b-[1px] border-white">
        <Link className="pb-3 flex items-center " href="/">
          For you
        </Link>
        <Link
          className="pb-3 flex items-center border-b-4 border-white"
          href="/"
        >
          Following
        </Link>
      </div>
      <Share />
      <Feed />
    </div>
  );
};

export default Homepage;
