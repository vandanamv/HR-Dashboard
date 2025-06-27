"use client";

import React, { useEffect, useState } from "react";
import { fetchUsers } from "@/lib/api";
import { assignDepartment, assignRating } from "@/utils/mockData";
import { useUserStore } from "@/store/useUserStore";
import UserCard from "@/components/Card/UserCard";
import CreateUserModal from "@/components/Modal/CreateUserModal";
import { FaUserPlus } from "react-icons/fa";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function HomePage() {
  const { users, setUsers } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ departments: [], ratings: [] });
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

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept =
      filters.departments.length === 0 ||
      filters.departments.includes(user.department);

    const matchesRating =
      filters.ratings.length === 0 ||
      filters.ratings.includes(user.rating);

    return matchesSearch && matchesDept && matchesRating;
  });

  return (
    <Layout isDark={isDark} toggleTheme={toggleTheme}>
      <SearchBar
        search={searchTerm}
        setSearch={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        users={users}
      />

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
