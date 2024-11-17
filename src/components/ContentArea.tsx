"use client";
import { createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";

const ContentArea = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create the chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        background: {
          color: "bg-slate-950", // Background color
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
    });

    // Add Area Series
    const areaSeries = chart.addAreaSeries({
      topColor: "rgba(38,198,218, 0.56)",
      bottomColor: "rgba(38,198,218, 0.04)",
      lineColor: "rgba(38,198,218, 1)",
      lineWidth: 2,
    });
    areaSeries.setData([
      { time: "2023-12-31", value: 22.67 },
      { time: "2024-01-01", value: 23.67 },
      { time: "2024-01-02", value: 24.67 },
    ]);

    // Add Candlestick Series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "rgba(255, 144, 0, 1)",
      downColor: "rgba(0, 144, 255, 1)",
      borderUpColor: "rgba(255, 144, 0, 1)",
      borderDownColor: "rgba(0, 144, 255, 1)",
      wickUpColor: "rgba(255, 144, 0, 1)",
      wickDownColor: "rgba(0, 144, 255, 1)",
    });
    candlestickSeries.setData([
      {
        time: "2024-09-09",
        open: 109.87,
        high: 114.69,
        low: 85.66,
        close: 111.26,
      },
      { time: "2024-10-10", open: 112, high: 115, low: 110, close: 113 },
    ]);

    // Example updates
    setTimeout(() => {
      areaSeries.update({ time: "2024-11-16", value: 25 });
      candlestickSeries.update({
        time: "2024-11-15",
        open: 113,
        high: 116,
        low: 111,
        close: 115,
      });
    }, 2000);

    return () => {
      chart.remove();
    };
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 pb-5 shadow:lg px-4">
      {/* Chart Container */}
      <div
        className="col-span-2 bg-black h-[500px]"
        ref={chartContainerRef}
      ></div>
      {/* Other Content */}
      <div className="flex flex-col gap-4">
        <div>{/* <WatchList /> */}</div>
      </div>
    </div>
  );
};

export default ContentArea;
