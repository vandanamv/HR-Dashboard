"use client";

import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ search, setSearch, filters, setFilters, users }) {
  const uniqueDepartments = [...new Set(users.map((u) => u.department))];
  const uniqueRatings = [...new Set(users.map((u) => u.rating))].sort((a, b) => a - b);

  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      const current = new Set(prev[type]);
      if (current.has(value)) current.delete(value);
      else current.add(value);
      return { ...prev, [type]: Array.from(current) };
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-4 space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name, email, or department"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md"
        />
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
      </div>

      <div className="flex gap-4 flex-wrap">
        <div>
          <label className="block font-semibold mb-1"></label>
          <select
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
            onChange={(e) => toggleFilter("departments", e.target.value)}
            value=""
          >
            <option value="" disabled>
              -- Select Department --
            </option>
            {uniqueDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <div className="mt-2 flex flex-wrap gap-2">
            {filters.departments.map((dept) => (
              <span
                key={dept}
                className="px-2 py-1 text-sm bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-white rounded-full cursor-pointer"
                onClick={() => toggleFilter("departments", dept)}
              >
                {dept} ✕
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1"></label>
          <select
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
            onChange={(e) => toggleFilter("ratings", parseInt(e.target.value))}
            value=""
          >
            <option value="" disabled>
              -- Select Rating --
            </option>
            {uniqueRatings.map((r) => (
              <option key={r} value={r}>
                {r} ★
              </option>
            ))}
          </select>
          <div className="mt-2 flex flex-wrap gap-2">
            {filters.ratings.map((r) => (
              <span
                key={r}
                className="px-2 py-1 text-sm bg-yellow-100 dark:bg-yellow-500 text-yellow-800 dark:text-white rounded-full cursor-pointer"
                onClick={() => toggleFilter("ratings", r)}
              >
                {r} ★ ✕
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
