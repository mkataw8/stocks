"use client";
import { createChart, Time } from "lightweight-charts";
import { useEffect, useRef } from "react";
import WatchList from "./watchList/WatchList";

type ChildProps = {
  getStock: string;
};

const ContentArea: React.FC<ChildProps> = ({ getStock }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const marketstack_API = process.env.NEXT_PUBLIC_MARKETSTACK_API;

  useEffect(() => {
    if (!chartContainerRef.current || !getStock) return;

    const getChartData = async () => {
      try {
        const response = await fetch(
          `https://api.marketstack.com/v1/eod?access_key=${marketstack_API}&symbols=${getStock}`
        );
        const data = await response.json();
        const timeSeries = data["data"];
        if (!timeSeries || timeSeries.length === 0) {
          console.error("No data found in response");
          return { areaData: [], candlestickData: [] };
        }

        const areaData = timeSeries
          .map((entry: any) => ({
            time: entry.date.split("T")[0] as Time,
            value: entry.close,
          }))
          .sort((a: any, b: any) => a.time.localeCompare(b.time));

        const candlestickData = timeSeries
          .map((entry: any) => ({
            time: entry.date.split("T")[0] as Time,
            open: entry.open,
            high: entry.high,
            low: entry.low,
            close: entry.close,
          }))
          .sort((a: any, b: any) => a.time.localeCompare(b.time));

        return { areaData, candlestickData };
      } catch (error) {
        console.error("Error fetching chart data:", error);
        return { areaData: [], candlestickData: [] };
      }
    };

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        background: {
          color: "#000000",
        },
        textColor: "#FFFFFF",
      },
      grid: {
        vertLines: {
          color: "#404040",
        },
        horzLines: {
          color: "#404040",
        },
      },
      timeScale: {
        timeVisible: true,
        borderColor: "#555",
      },
    });

    const areaSeries = chart.addAreaSeries({
      topColor: "rgba(0, 0, 0, 0)",
      bottomColor: "rgba(0, 0, 0, 0)",
      lineColor: "rgba(0,0,0,0)",
      lineWidth: 1,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#07bf04",
      downColor: "#fc0303",
      borderUpColor: "#07bf04",
      borderDownColor: "#fc0303",
      wickUpColor: "#07bf04",
      wickDownColor: "#fc0303",
    });

    const loadChartData = async () => {
      const { areaData, candlestickData } = await getChartData();
      if (areaData.length) areaSeries.setData(areaData);
      if (candlestickData.length) candlestickSeries.setData(candlestickData);
    };

    loadChartData();

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current?.clientWidth || 0,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      chart.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, [getStock, marketstack_API]);

  return (
    <div
      className=" 
    grid grid-cols-1 md:grid-cols-3 gap-4 pb-5 shadow-lg "
    >
      <div
        className="col-span-2 bg-black h-[500px]"
        ref={chartContainerRef}
      ></div>
      <div className="flex flex-col gap-4 col-span-1 ">
        <div>
          <WatchList />
        </div>
      </div>
    </div>
  );
};

export default ContentArea;
