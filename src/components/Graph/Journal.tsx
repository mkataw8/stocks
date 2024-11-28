import { Chart, registerables, type ChartConfiguration } from "chart.js";
import { useEffect, useState } from "react";

const Journal = () => {
  let chart: Chart | null = null;
  Chart.register(...registerables);

  const [chartData, setChartData] = useState<
    { date: string; amount: number }[]
  >([]);
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const config: ChartConfiguration<"line"> = {
      type: "line",
      data: {
        labels: chartData.map((point) => point.date),
        datasets: [
          {
            label: "Current Progress",
            backgroundColor: "rgba(99, 102, 241, 0.2)",
            borderColor: "#6366F1",
            pointBackgroundColor: "#6366F1",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#6366F1",
            data: chartData.map((point) => point.amount),
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {},
          },
        },
        scales: {
          x: {
            ticks: {
              color: "white",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
          },
          y: {
            ticks: {
              color: "white",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
          },
        },
      },
    };

    const element = document.getElementById("line-chart") as HTMLCanvasElement;
    if (!element) return;

    const ctx = element.getContext("2d");
    if (!ctx) return;

    chart = new Chart(ctx, config);

    return () => {
      if (chart) {
        chart.destroy();
        chart = null;
      }
    };
  }, [chartData]);

  const handleAddData = () => {
    if (!amount || !date || isNaN(Number(amount))) {
      alert("Please enter a valid amount and date.");
      return;
    }

    setChartData((prev) => [...prev, { date, amount: Number(amount) }]);

    setAmount("");
    setDate("");
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-800 to-slate-950 min-w-screen relative mb-6 flex w-full flex-col break-words rounded-lg shadow-lg">
      <div className="mb-0 rounded-t bg-transparent px-4 py-3">
        <div className="flex flex-wrap items-center justify-between">
          <h6 className="text-white mb-1 text-sm font-semibold uppercase tracking-wider">
            Overview
          </h6>
          <h2 className="text-2xl font-semibold text-white">Progress</h2>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <input
            type="number"
            placeholder="Enter Gain/Loss"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full max-w-xs px-3 py-2 rounded-md bg-white text-black shadow focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full max-w-xs px-3 py-2 rounded-md bg-white text-black shadow focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <button
            onClick={handleAddData}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition duration-200 shadow"
          >
            Add
          </button>
        </div>
      </div>

      <div className="flex-auto p-4">
        <div className="h-[350px] relative">
          <canvas id="line-chart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Journal;
