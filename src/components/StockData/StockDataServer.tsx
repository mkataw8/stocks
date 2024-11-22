import StockDataClient from "./StockDataClient";

async function fetchStockData(getStock: string) {
  const businessDate = new Date().toISOString().split("T")[0];
  const response = await fetch(
    `https://api.polygon.io/v2/aggs/ticker/${getStock}/range/1/day/${businessDate}/${businessDate}?apiKey=YOUR_API_KEY`
  );
  return await response.json();
}

export default async function StockDataServer({
  getStock,
}: {
  getStock: string;
}) {
  const data = await fetchStockData(getStock);
  return <StockDataClient stockData={data} />;
}
