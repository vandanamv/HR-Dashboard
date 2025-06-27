"use client";

import { useUserStore } from "@/store/useUserStore";
import { useBookmarkStore } from "@/store/useBookmarkStore";
import { useEffect, useRef, useState } from "react";
import { fetchUsers } from "@/lib/api";
import { assignDepartment, assignRating } from "@/utils/mockData";
import DepartmentRatingChart from "@/components/Chart/DepartmentRatingChart";
import BookmarkBarChart from "@/components/Chart/BookmarkBarChart";
import { FaArrowLeft, FaFilePdf, FaImage } from "react-icons/fa";
import Link from "next/link";

export default function AnalyticsContent() {
  const { users, setUsers } = useUserStore();
  const { bookmarks } = useBookmarkStore();
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      if (users.length === 0) {
        const data = await fetchUsers();
        const enriched = data.map((user) => ({
          ...user,
          department: assignDepartment(),
          rating: assignRating(),
        }));
        setUsers(enriched);
      }
      setLoading(false);
    };
    load();
  }, [setUsers, users.length]);

  const departmentRatings = users.reduce((acc, user) => {
    const { department, rating } = user;
    if (!acc[department]) acc[department] = { total: 0, count: 0 };
    acc[department].total += rating;
    acc[department].count += 1;
    return acc;
  }, {});

  const averageRatings = {};
  for (const dept in departmentRatings) {
    const { total, count } = departmentRatings[dept];
    averageRatings[dept] = (total / count).toFixed(2);
  }

  const bookmarksByDept = bookmarks.reduce((acc, user) => {
    const dept = user.department || "Unknown";
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  const past7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });

  const bookmarkTrend = past7Days.reduce((acc, date) => {
    const count = bookmarks.filter((u) => u.bookmarkedAt?.startsWith(date)).length;
    acc[date] = count;
    return acc;
  }, {});

  const downloadImage = async () => {
    const html2canvas = (await import("html2canvas")).default;
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "analytics.png";
      link.click();
    }
  };

  const downloadPDF = async () => {
    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).default;
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("analytics.pdf");
    }
  };

  return (
    <main className="p-6 max-w-6xl mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="text-gray-800 dark:text-gray-200 hover:text-blue-800 flex items-center transition-colors"
          >
            <FaArrowLeft className="text-gray-800 dark:text-gray-200" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Analytics Dashboard
          </h1>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={downloadImage}
            title="Download Image"
            className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
          >
            <FaImage size={24} className="text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={downloadPDF}
            title="Download PDF"
            className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"
          >
            <FaFilePdf size={24} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600 dark:text-gray-400">Loading analytics...</p>
        </div>
      ) : (
        <div ref={chartRef} className="flex flex-col items-center space-y-8 w-full">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-full max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 text-center">
              Department Ratings
            </h2>
            <DepartmentRatingChart data={averageRatings} />
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-full max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 text-center">
              Bookmarks by Department
            </h2>
            <BookmarkBarChart data={bookmarksByDept} />
          </div>
        </div>
      )}
    </main>
  );
}
