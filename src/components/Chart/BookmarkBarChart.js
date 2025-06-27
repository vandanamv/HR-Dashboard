"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BookmarkBarChart({ data }) {
  const labels = Object.keys(data);
  const counts = Object.values(data);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow w-full max-w-2xl mt-8">
      <h2 className="text-lg font-semibold mb-2"></h2>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Bookmark Count",
              data: counts,
              backgroundColor: "rgba(234, 88, 12, 0.7)", // Tailwind orange-600
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              beginAtZero: true,
              precision: 0,
              ticks: {
                stepSize: 1,
              },
            },
          },
        }}
      />
    </div>
  );
}
