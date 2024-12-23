"use client";
import React, { useEffect, useState } from "react";

const cnbc_API = process.env.NEXT_PUBLIC_CNBC_API;
type NewsItem = {
  headline: string;
  time: string;
  link: string;
  index: number;
};

const NewsFeed: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [displayCount, setDisplayCount] = useState<number>(2);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const url = "https://cnbc-markets-and-news-data.p.rapidapi.com/news/latest";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": `${cnbc_API}`,
        "x-rapidapi-host": "cnbc-markets-and-news-data.p.rapidapi.com",
      },
    };

    const fetchNews = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();

        const fetchedNews = data.data.map((item: any, index: number) => ({
          headline: item.headline || "No headline available",
          time: item.time || "No time available",
          link: item.link || "#",
          index,
        }));
        setNewsItems(fetchedNews);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, []);

  const loadMore = () => {
    setDisplayCount(6);
    setIsExpanded(true);
  };

  const loadLess = () => {
    setDisplayCount(2);
    setIsExpanded(false);
  };

  return (
    <div
      className={`bg-slate-150 py-4 px-6 shadow-md ${
        isExpanded ? "h-auto" : "h-auto"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4 text-black">Latest News</h2>

      <div>
        {newsItems && newsItems.length > 0 ? (
          newsItems.slice(0, displayCount).map((news) => (
            <div
              key={news.index}
              className="p-4 m-2 bg-gray-950 shadow-md hover:bg-slate-800 rounded-lg"
            >
              <a href={news.link} target="_blank" rel="noopener noreferrer">
                <h3 className="text-lg font-bold text-white">
                  {news.headline}
                </h3>
              </a>
              <p className="text-sm text-gray-400">{news.time}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No news available.</p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        {displayCount === 2 ? (
          <button
            onClick={loadMore}
            className="bg-orange-400 text-white px-6 py-2 rounded-full hover:bg-orange-500"
          >
            Show More...
          </button>
        ) : (
          <button
            onClick={loadLess}
            className="bg-orange-400 text-white px-6 py-2 rounded-full hover:bg-orange-500"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
