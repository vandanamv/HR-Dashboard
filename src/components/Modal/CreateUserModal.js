"use client";

import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateUserModal({ isOpen, onClose }) {
  const addUser = useUserStore((state) => state.addUser);

  const departments = ["HR", "Engineering", "Marketing", "Finance", "Operations"];
  const ratings = [1, 2, 3, 4, 5];

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    department: "",
    rating: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = "First Name is required";
    if (!form.lastName) newErrors.lastName = "Last Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Valid Email is required";
    if (!form.age || form.age < 18 || form.age > 60) newErrors.age = "Age must be 18–60";
    if (!form.department) newErrors.department = "Department is required";
    if (!form.rating) newErrors.rating = "Rating is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }
    addUser({ ...form, age: +form.age, rating: +form.rating });
    onClose();
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      department: "",
      rating: "",
    });
    setErrors({});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">
              ➕ Create New User
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { field: "firstName", label: "First Name", type: "text" },
                { field: "lastName", label: "Last Name", type: "text" },
                { field: "email", label: "Email", type: "email" },
                { field: "age", label: "Age", type: "number" },
              ].map(({ field, label, type }) => (
                <div key={field} className="space-y-1">
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                  </label>
                  <input
                    id={field}
                    type={type}
                    placeholder={label}
                    className={`w-full p-3 rounded border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors[field] ? "border-red-500" : "border-gray-300"
                    }`}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  />
                  {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                </div>
              ))}

              <div className="space-y-1">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Department
                </label>
                <select
                  id="department"
                  className={`w-full p-3 rounded border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.department ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                >
                  <option value="" disabled>
                    Select a department
                  </option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Rating
                </label>
                <select
                  id="rating"
                  className={`w-full p-3 rounded border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.rating ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
                >
                  <option value="" disabled>
                    Select a rating
                  </option>
                  {ratings.map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
                {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
