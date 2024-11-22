"use client";

export default function StockDataClient({ stockData }: { stockData: any }) {
  return <div>Stock data: {JSON.stringify(stockData)}</div>;
}
