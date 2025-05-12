/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineFire } from "react-icons/hi";
import { HiArrowLongRight } from "react-icons/hi2";

const PopularTags = () => {
  const [news, setNews] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async (currentPage: number) => {
    try {
      const response = await axios.get(`/api/news?page=${currentPage}`);
      const newArticles = response.data.articles;
      const totalResults = response.data.totalResults;

      setNews((prev) => [...prev, ...newArticles]);

      if (currentPage * 5 >= totalResults) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews(1); // Initial fetch
  }, []);

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(nextPage);
  };

  return (
    <div className="p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col gap-5 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <HiOutlineFire className="text-red-500" size={20} />
        <h1 className="text-xl font-bold text-white">Trending News</h1>
      </div>

      <div className="flex flex-col divide-y divide-gray-100">
        {news.map((article, index) => (
          <div key={index} className={`py-3 ${index === 0 ? "pt-0" : ""}`}>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white">
                {article.source.name} •{" "}
                {new Date(article.publishedAt).toLocaleString()}
              </span>
              <h2 className="font-bold text-white mt-1 hover:text-black transition-colors">
                {article.title}
              </h2>
              {article.author && (
                <span className="text-xs text-gray-300 mt-1">
                  By {article.author}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={handleShowMore}
          className="text-white border border-white px-2 relative flex items-center gap-1 text-sm font-medium py-2 rounded-full self-start hover:text-black transition-colors mt-1"
        >
          <span>Show more</span>
          <HiArrowLongRight size={18} />
        </button>
      )}
    </div>
  );
};

export default PopularTags;
