import Link from "next/link";
import { FaHashtag, FaInfoCircle } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { HiOutlineFire } from "react-icons/hi"; // Fire icon for trending
import { HiArrowLongRight } from "react-icons/hi2"; // Modern arrow
import Image from "./Image";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiInfo } from "react-icons/fi";

const PopularTags = () => {
  // Sample trending topics data - could be passed as props in a real implementation
  const trendingTopics = [
    {
      category: "Sports",
      title: "Nadal v Federer Grand Slam",
      time: "Last Night",
      posts: null,
      isEvent: true,
    },
    {
      category: "Technology",
      title: "OpenAI",
      posts: "20K",
    },
    {
      category: "Entertainment",
      title: "Grammy Awards",
      posts: "15K",
    },
    {
      category: "Business",
      title: "Tesla Stock",
      posts: "12K",
    },
    {
      category: "Health",
      title: "Meditation",
      posts: "8K",
    },
  ];

  return (
    <div className="p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col gap-5 backdrop-blur-sm">
      {/* Header with icon */}
      <div className="flex items-center gap-2">
        <HiOutlineFire className="text-red-500" size={20} />
        <h1 className="text-xl font-bold text-white">Trending Now</h1>
      </div>

      {/* Trending items */}
      <div className="flex flex-col divide-y divide-gray-100">
        {trendingTopics.map((topic, index) => (
          <div key={index} className={`py-3 ${index === 0 ? "pt-0" : ""}`}>
            {topic.isEvent ? (
              // Event item with image
              <div className="flex gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden  from-blue-50 to-indigo-100">
                  <Image
                    path="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgMTIwIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2UwZTBlMCIvPjxyZWN0IHg9IjMwIiB5PSIyNSIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iNSIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNDQ0NDQ0IiBzdHJva2Utd2lkdGg9IjIiLz48cmVjdCB4PSIzMCIgeT0iMjUiIHdpZHRoPSI2MCIgaGVpZ2h0PSIxNSIgcng9IjUiIHJ5PSI1IiBmaWxsPSIjZmY1NTU1Ii8+PGNpcmNsZSBjeD0iNDUiIGN5PSIyNSIgcj0iMyIgZmlsbD0iIzQ0NDQ0NCIvPjxjaXJjbGUgY3g9Ijc1IiBjeT0iMjUiIHI9IjMiIGZpbGw9IiM0NDQ0NDQiLz48bGluZSB4MT0iNDUiIHkxPSI1MCIgeDI9Ijc1IiB5Mj0iNTAiIHN0cm9rZT0iIzQ0NDQ0NCIgc3Ryb2tlLXdpZHRoPSIyIi8+PGxpbmUgeDE9IjQ1IiB5MT0iNjUiIHgyPSI3NSIgeTI9IjY1IiBzdHJva2U9IiM0NDQ0NDQiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjYwIiB5PSIxMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzQ0NDQ0NCIgZm9udC13ZWlnaHQ9ImJvbGQiPkV2ZW50PC90ZXh0Pjwvc3ZnPg=="
                    alt="event"
                    w={120}
                    h={120}
                    tr={true}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="text-xs font-medium px-2 py-1  text-white rounded-full">
                      {topic.category}
                    </span>
                  </div>
                  <h2 className="font-bold text-white mt-1 hover:text-black transition-colors">
                    {topic.title}
                  </h2>
                  <span className="text-xs text-white">{topic.time}</span>
                </div>
              </div>
            ) : (
              // Regular trending topic
              <div className="group cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium px-2 py-1  text-white rounded-full">
                      {topic.category}
                    </span>
                    <span className="text-xs text-white flex items-center gap-1 ml-1">
                      <HiOutlineFire size={12} />
                      Trending
                    </span>
                  </div>
                  <FiInfo
                    className="text-white group-hover:text-black transition-colors"
                    size={14}
                  />
                </div>
                <h2 className="text-white font-bold mt-1 group-hover:text-black transition-colors">
                  {topic.title}
                </h2>
                <span className="text-xs text-white">{topic.posts} posts</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Show more link */}
      <Link
        href="/"
        className="text-white border border-white px-2 rounded-full relative flex items-center gap-1 text-sm font-medium py-2 px-4 rounded-full self-start hover:text-black transition-colors mt-1"
      >
        <span>Show more</span>
        <HiArrowLongRight size={18} />
      </Link>
    </div>
  );
};

export default PopularTags;
