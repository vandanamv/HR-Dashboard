"use client";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BookmarkTrendLineChart({ data }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow w-full max-w-2xl mt-8">
      <h2 className="text-lg font-semibold mb-2">📈 Bookmark Trend (Last 7 Days)</h2>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Bookmarks",
              data: values,
              borderColor: "rgba(59, 130, 246, 1)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              fill: true,
              tension: 0.3,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "bottom" },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1 },
            },
          },
        }}
      />
    </div>
  );
}
