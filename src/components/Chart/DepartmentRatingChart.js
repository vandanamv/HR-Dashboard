"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DepartmentRatingChart({ data }) {
  const departments = Object.keys(data);
  const averageRatings = departments.map((dept) => data[dept]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow w-full max-w-2xl">
      <h2 className="text-lg font-semibold mb-2"></h2>
      <Bar
        data={{
          labels: departments,
          datasets: [
            {
              label: "Average Rating",
              data: averageRatings,
              backgroundColor: "rgba(59, 130, 246, 0.7)", // Tailwind blue-500
              borderRadius: 10, // Rounds the corners of the bars
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            x: {
              grid: {
                display: false, // This removes the vertical grid lines
              },
            },
            y: {
              beginAtZero: true,
              max: 5,
              ticks: {
                stepSize: 1, // Ensures the y-axis ticks are at intervals of 1
              },
              grid: {
                display: false, // This removes the horizontal grid lines
              },
            },
          },
        }}
      />
    </div>
  );
}
