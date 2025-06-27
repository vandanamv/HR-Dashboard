// components/Layout.js
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaBookmark,
  FaChartBar,
  FaUserCog,
  FaMoon,
  FaSun,
} from "react-icons/fa";

export default function Layout({ children, isDark, toggleTheme }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Topbar with icons */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">User Management</h1>
          <div className="flex gap-4 text-xl items-center">
            <motion.div whileHover={{ scale: 1.2 }} title="Bookmarks">
              <Link href="/bookmarks" className="flex items-center px-3 py-1 rounded-full text-purple-500 hover:bg-purple-200 transition-all">
                <FaBookmark />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} title="Analytics">
              <Link href="/analytics" className="flex items-center px-3 py-1 rounded-full text-green-500 hover:bg-green-100 transition-all">
                <FaChartBar />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} title="Settings">
              <Link href="/settings" className="flex items-center px-3 py-1 rounded-full text-blue-500 hover:bg-blue-100 transition-all">
                <FaUserCog />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} title="Toggle Theme">
              <button onClick={toggleTheme} className="flex items-center px-3 py-1 rounded-full text-yellow-500 hover:bg-yellow-100 transition-all">
                {isDark ? <FaSun /> : <FaMoon />}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Main content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
