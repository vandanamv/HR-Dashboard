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
          <h1 className="text-3xl font-bold">HR Dashboard</h1>
          <div className="flex gap-4 text-xl text-gray-600 dark:text-gray-300 items-center">
            <motion.div whileHover={{ scale: 1.2 }} title="Bookmarks">
              <Link href="/bookmarks" className="relative">
                <FaBookmark className="hover:text-yellow-500" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  !
                </span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} title="Analytics">
              <Link href="/analytics">
                <FaChartBar className="hover:text-green-500" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} title="Settings">
              <Link href="/settings">
                <FaUserCog className="hover:text-blue-500" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} title="Toggle Theme">
              <button onClick={toggleTheme}>
                {isDark ? (
                  <FaSun className="hover:text-yellow-400 transition" />
                ) : (
                  <FaMoon className="hover:text-gray-600 transition" />
                )}
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
