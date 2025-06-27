"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchUsers } from "@/lib/api";
import { assignDepartment, assignRating } from "@/utils/mockData";
import EmployeeTabs from "@/components/Tabs/EmployeeTabs";
import { useUserStore } from "@/store/useUserStore";
import Link from "next/link";
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
} from "react-icons/fa";

export default function EmployeeDetail() {
  const params = useParams();
  const id = params.id;
  const [employee, setEmployee] = useState(
    useUserStore.getState().getUserById(id)
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const users = await fetchUsers();
        const enriched = users.map((user) => ({
          ...user,
          department: assignDepartment(),
          rating: assignRating(),
        }));
        const emp = enriched.find((u) => u.id.toString() === id);
        setEmployee(emp);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) return <p className="p-6 text-center">Loading employee details...</p>;
  if (!employee) return <p className="p-6 text-center">Employee not found.</p>;

  return (
    <main className="p-6 mx-auto min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="flex items-center text-black-600 hover:text-blue-800 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
          </Link>
          <div className="text-center">
            <img
              src={employee.image}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg object-cover mx-auto"
            />
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <FaUser /> {employee.firstName} {employee.lastName}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center justify-center gap-2">
            <FaEnvelope /> {employee.email}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-inner mb-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
            <FaUser className="text-gray-500" />
            <span><strong>Age:</strong> {employee.age}</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
            <FaBuilding className="text-gray-500" />
            <span>
              <strong>Department:</strong>
              <span className="ml-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-200 text-blue-800">
                {employee.department}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
            <FaPhone className="text-gray-500" />
            <span><strong>Phone:</strong> {employee.phone}</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
            <FaMapMarkerAlt className="text-gray-500" />
            <span><strong>Address:</strong> {employee.address.address}, {employee.address.city}</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
            <strong>Rating:</strong>
            <span className="text-yellow-500 ml-1">
              {"★".repeat(employee.rating)}
              {"☆".repeat(5 - employee.rating)}
            </span>
          </div>
        </div>

        <EmployeeTabs employeeId={employee.id} />
      </div>
    </main>
  );
}
