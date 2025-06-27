"use client";

import { useRouter } from 'next/navigation';
import { useBookmarkStore } from "@/store/useBookmarkStore";
import UserCard from "@/components/Card/UserCard";
import { FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";

export default function BookmarksPage() {
  const router = useRouter();
  const { bookmarks, removeBookmark } = useBookmarkStore();

  const handlePromote = (user) => {
    alert(`🚀 Promoted ${user.firstName}`);
  };

  const handleDemote = (user) => {
    alert(`👎 Demoted ${user.firstName}`);
  };

  const handleAssignProject = (user) => {
    alert(`✅ Assigned a project to ${user.firstName}`);
  };

  const goToHomepage = () => {
    router.push('/');
  };

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-4">
        <button onClick={goToHomepage} className="mr-2">
          <FaArrowLeft />
        </button>
        <h1 className="text-3xl font-bold">Bookmarked Employees</h1>
      </div>

      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((user) => (
            <div key={user.id} className="relative">
              <UserCard user={user} onPromote={handlePromote} onDemote={handleDemote} />
              <div className="absolute top-8 right-2 flex space-x-1">
                <button
                  onClick={() => handleAssignProject(user)}
                  className="text-xs bg-green-600 text-white p-1 rounded"
                  title="Assign Project"
                >
                  <FaCheck />
                </button>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
