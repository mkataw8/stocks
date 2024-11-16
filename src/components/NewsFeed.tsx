import React from "react";

const NewsFeed: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      title: "Breaking: Market Hits All-Time High",
      description:
        "The stock market reached record highs today, driven by tech stocks.",
    },
    {
      id: 2,
      title: "Breaking: Market Hits All-Time High",
      description:
        "The stock market reached record highs today, driven by tech stocks.",
    },
  ];

  return (
    <div className=" bg-slate-150 py-4 px-6 shadow-md ">
      <h2 className="text- font-semibold mb-4 text-black">Latest News</h2>
      <div className="space-y-4">
        {newsItems.map((item) => (
          <div key={item.id} className="p-4 bg-gray-950  rounded-lg shadow-md">
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
