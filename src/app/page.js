"use client";

import React, { useEffect, useState } from "react";
import { fetchUsers } from "@/lib/api";
import { assignDepartment, assignRating } from "@/utils/mockData";
import { useUserStore } from "@/store/useUserStore";
import UserCard from "@/components/Card/UserCard";
import CreateUserModal from "@/components/Modal/CreateUserModal";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";

export default function HomePage() {
  const { users, setUsers } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [isDark, setIsDark] = useState(false);

  // Sync theme from localStorage
  useEffect(() => {
    const darkTheme = localStorage.getItem("mock-theme") === "dark";
    setIsDark(darkTheme);
    document.documentElement.classList.toggle("dark", darkTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("mock-theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  // Sync users across tabs
  useEffect(() => {
    const syncUsersAcrossTabs = (e) => {
      if (e.key === "user-sync") {
        const synced = JSON.parse(localStorage.getItem("users"));
        if (synced) setUsers(synced);
      }
    };
    window.addEventListener("storage", syncUsersAcrossTabs);
    return () => window.removeEventListener("storage", syncUsersAcrossTabs);
  }, [setUsers]);

  // Fetch & enrich users
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
        localStorage.setItem("users", JSON.stringify(enriched));
        localStorage.setItem("user-sync", Date.now()); // trigger sync
      }
    };
    load();
  }, [setUsers, users.length]);

  const departments = [...new Set(users.map((u) => u.department))];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(user.department);

    const matchesRating =
      selectedRatings.length === 0 ||
      selectedRatings.includes(user.rating);

    return matchesSearch && matchesDept && matchesRating;
  });

  const toggleSelection = (value, setter, current) => {
    setter(
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
    );
  };

  return (
    <Layout isDark={isDark} toggleTheme={toggleTheme}>
      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by name, email or department..."
            className="w-full p-2 pl-10 rounded border dark:bg-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
        </div>

        {/* Departments */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Filter by Department:
          </label>
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() =>
                  toggleSelection(dept, setSelectedDepartments, selectedDepartments)
                }
                className={`px-3 py-1 rounded-full border text-sm ${
                  selectedDepartments.includes(dept)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Ratings */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Filter by Rating:
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() =>
                  toggleSelection(rating, setSelectedRatings, selectedRatings)
                }
                className={`px-2 py-1 rounded border text-sm ${
                  selectedRatings.includes(rating)
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {rating}⭐
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users */}
      {filteredUsers.length === 0 ? (
        <p className="text-gray-500">No matching users found.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}

      {/* Add User Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      >
        <FaUserPlus />
      </motion.button>

      <CreateUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Layout>
  );
}
