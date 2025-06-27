"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit } from "react-icons/fa";

const tabs = ["Overview", "Projects", "Feedback"];

export default function EmployeeTabs({ employeeId }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [feedback, setFeedback] = useState("");
  const [submittedFeedbackList, setSubmittedFeedbackList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      if (editIndex !== null) {
        // Update existing feedback
        const updatedFeedbackList = [...submittedFeedbackList];
        updatedFeedbackList[editIndex] = feedback;
        setSubmittedFeedbackList(updatedFeedbackList);
        setEditIndex(null);
      } else {
        // Add new feedback
        setSubmittedFeedbackList([...submittedFeedbackList, feedback]);
      }
      setFeedback("");
    }
  };

  const handleEditFeedback = (index) => {
    setFeedback(submittedFeedbackList[index]);
    setEditIndex(index);
  };

  const renderTabContent = (tab) => {
    switch (tab) {
      case "Overview":
        return (
          <div className="text-gray-500 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p>This employee has shown consistent performance. Metrics and summary go here.</p>
          </div>
        );
      case "Projects":
        return (
          <ul className="list-disc ml-5 space-y-2 text-gray-500 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <li>Project Alpha - Completed</li>
            <li>Project Beta - In Progress</li>
            <li>Project Gamma - Pending</li>
          </ul>
        );
      case "Feedback":
        return (
          <div className="space-y-4 text-gray-500 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            {submittedFeedbackList.length > 0 && (
              <div className="space-y-4">
                {submittedFeedbackList.map((feedbackItem, index) => (
                  <div key={index} className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg relative">
                    <p>{feedbackItem}</p>
                    <button
                      onClick={() => handleEditFeedback(index)}
                      className="absolute top-2 right-2 text-blue-500 hover:text-blue-700 bg-transparent hover:shadow-blue-300 hover:shadow px-2 py-1 rounded-full transition-shadow"
                    >
                      <FaEdit />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <form className="space-y-4" onSubmit={handleSubmitFeedback}>
              <textarea
                placeholder="Write feedback..."
                className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:text-white"
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-shadow hover:shadow-lg hover:shadow-blue-500/50"
              >
                {editIndex !== null ? "Update" : "Submit"}
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border-t mt-6 pt-4">
      <div className="flex space-x-2 mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full transition-shadow hover:shadow-lg ${
              activeTab === tab
                ? "bg-blue-500 text-white hover:shadow-blue-500/50"
                : "bg-transparent text-gray-500 hover:bg-gray-300 hover:shadow-gray-500/50"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          {renderTabContent(activeTab)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
