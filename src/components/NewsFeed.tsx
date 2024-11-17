"use client";
import React, { useEffect, useState } from "react";

type NewsItem = {
  headline: string;
  time: string;
  link: string;
  index: number;
};

const NewsFeed: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    const url = "https://cnbc-markets-and-news-data.p.rapidapi.com/news/latest";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5179b6d649msh2cb1741b904950cp150c1cjsn7b7516c97263",
        "x-rapidapi-host": "cnbc-markets-and-news-data.p.rapidapi.com",
      },
    };

    const fetchNews = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);

        // Assume data.news contains an array of news items
        const limitedNews = data.data
          .slice(0, 2)
          .map((item: any, index: number) => ({
            headline: item.headline || "No headline available", // Fallback for missing headline
            time: item.time || "No time available", // Fallback for missing time
            link: item.link || "#", // Fallback for missing link
            index,
          })); // Get only the first 2 news items
        setNewsItems(limitedNews);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="bg-slate-150 py-4 px-6 shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-black">Latest News</h2>

      <div>
        {newsItems && newsItems.length > 0 ? (
          newsItems.map((news) => (
            <div
              key={news.index}
              className="p-4 m-2 bg-gray-950 rounded-lg shadow-md"
            >
              <a href={news.link}>
                <h3 className="text-lg font-bold">{news.headline}</h3>
              </a>
              <p className="text-sm text-gray-600">{news.time}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No news available.</p>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
