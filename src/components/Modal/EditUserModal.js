// ✅ Edit Modal Component (src/components/Modal/EditUserModal.js)
"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { motion, AnimatePresence } from "framer-motion";

export default function EditUserModal({ isOpen, onClose, user }) {
  const editUser = useUserStore((state) => state.editUser);
  const [form, setForm] = useState(user);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(user);
  }, [user]);

  const validate = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = "Required";
    if (!form.lastName) newErrors.lastName = "Required";
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid Email";
    if (!form.age || form.age < 18 || form.age > 60) newErrors.age = "18–60 only";
    if (!form.department) newErrors.department = "Required";
    if (!form.rating || form.rating < 1 || form.rating > 5) newErrors.rating = "1–5 only";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }
    editUser({ ...form, age: +form.age, rating: +form.rating });
    onClose();
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
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              {["firstName", "lastName", "email", "age", "department", "rating"].map((field) => (
                <div key={field}>
                  <input
                    type={field === "age" || field === "rating" ? "number" : "text"}
                    placeholder={field}
                    className="w-full p-2 rounded border dark:bg-gray-800"
                    value={form[field] || ""}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  />
                  {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                </div>
              ))}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-1 rounded bg-gray-300 dark:bg-gray-700"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-1 rounded bg-green-600 text-white">
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
