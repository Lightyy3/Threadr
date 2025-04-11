import Link from "next/link";
import PopularTags from "./PopularTags";
import Recommendations from "./Recommendations";
import Search from "./Search";

const RightBar = () => {
  return (
    <div className="bg-[#5A04FF] flex flex-col gap-4 sticky top-0 h-full max-h-screen pb-4">
      <Search />
      <PopularTags />
      <Recommendations />
      <div className="text-sm mb-4 items-center text-white flex flex-wrap gap-x-8 gap-y-4 justify-center sm:justify-start border border-white px-2 rounded-2xl relative">
        <Link href="/" className="hover:text-white transition-colors ml-2">
          Terms of Service
        </Link>
        <Link href="/" className="hover:text-white transition-colors">
          Privacy Policy
        </Link>
        <Link href="/" className="hover:text-white transition-colors">
          Cookie Policy
        </Link>
        <Link href="/" className="hover:text-white transition-colors ml-2">
          Accessibility
        </Link>
        <Link href="/" className="hover:text-white transition-colors">
          Ads Info
        </Link>
        <span className="text-white">© 2025 Threadr Corp.</span>
      </div>
    </div>
  );
};

export default RightBar;
