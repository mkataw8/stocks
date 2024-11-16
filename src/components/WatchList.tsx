import React from "react";

const WatchlistComponent: React.FC = () => {
  return (
    <div className="bg-orange-500 h-96">
      <div className="  text-white rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold">Watchlist</h3>
        <ul className="mt-2 space-y-2">
          <li className="text-sm">AAPL: $150.25</li>
          <li className="text-sm">TSLA: $742.50</li>
          <li className="text-sm">GOOG: $2,850.00</li>
        </ul>
      </div>
    </div>
  );
};

export default WatchlistComponent;
