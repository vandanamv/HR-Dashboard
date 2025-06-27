"use client";

import { useState } from "react";
import { FaStar,FaCheck } from "react-icons/fa";
import { useBookmarkStore } from "@/store/useBookmarkStore";

export default function UserCard({ user, onPromote, onDemote }) {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarkStore();
  const [isPromoted, setIsPromoted] = useState(user.isPromoted || false);

  const isBookmarked = bookmarks.some((u) => u.id === user.id);

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(user.id);
      console.log("❌ Removed from bookmarks:", user.id);
    } else {
      addBookmark(user);
      console.log("✅ Added to bookmarks:", user.id);
    }
  };

  const handlePromote = () => {
    setIsPromoted(true);
    onPromote(user);
    alert(`🚀 Promoted ${user.firstName}`);
  };

  const handleDemote = () => {
    setIsPromoted(false);
    onDemote(user);
    alert(`👎 Demoted ${user.firstName}`);
  };

  const handleAssignProject = () => {
    alert(`✅ Assigned a project to ${user.firstName}`);
  };

  return (
    <div className={`p-4 pt-10 bg-white dark:bg-gray-800 shadow rounded-xl space-y-2 relative border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${isPromoted ? 'border-green-500 hover:bg-green-50' : 'border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
      <div className="absolute top-2 left-2 right-2 flex justify-between">
        <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-200 text-blue-800">
          {user.department}
        </div>
        {isPromoted && (
          <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-200 text-green-800">
            Promoted
          </div>
        )}
      </div>
      <div className="font-semibold text-lg mt-6">
        {user.firstName} {user.lastName}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300">{user.email}</div>
      <div className="text-sm">Age: {user.age}</div>

      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={i < user.rating ? "text-yellow-400" : "text-gray-300"} />
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-4 items-center">
        <a href={`/employee/${user.id}`} className="text-blue-600 hover:text-blue-800 flex items-center">
           View
        </a>
        <button onClick={toggleBookmark} className="text-blue-600 hover:text-blue-800 flex items-center">
           {isBookmarked ? "Remove" : "Bookmark"}
        </button>
        {!isPromoted ? (
          <button onClick={handlePromote} className="text-blue-600 hover:text-blue-800 flex items-center">
            Promote
          </button>
        ) : (
          <>
            <button onClick={handleDemote} className="text-red-600 hover:text-red-800 flex items-center">
              Demote
            </button>
          </>
        )}
      </div>
    </div>
  );
}
