 "use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function SettingsPage() {
  const [userName, setUserName] = useState("User");
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("User");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("English");
  const fileInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Generate a random avatar URL
    const randomAvatarUrl = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;
    setAvatarUrl(randomAvatarUrl);
  }, []);

  const handleSave = () => {
    setUserName(newName);
    setEditing(false);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const goToHomepage = () => {
    router.push('/');
  };

  return (
    <main className="p-6 max-w-3xl mx-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex items-center mb-6">
        <button onClick={goToHomepage} className="mr-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
          <FaArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
        <section className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Personal Information</h2>
          <div className="flex flex-col items-center sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
            />
            <div>
              <button
                onClick={() => fileInputRef.current.click()}
                className="text-sm text-blue-500 dark:text-blue-400 hover:underline mt-2"
              >
                Change Avatar
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleAvatarUpload}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="font-semibold block text-sm mb-1 text-gray-600 dark:text-gray-400"></label>
            {editing ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  className="p-2 rounded border w-full max-w-xs border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-150"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <p className="text-lg text-gray-800 dark:text-gray-200">{userName}</p>
                <button
                  onClick={() => setEditing(true)}
                  className="text-sm text-blue-500 dark:text-blue-400 hover:underline"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Notification Settings</h2>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="notifications"
              checked={notificationsEnabled}
              onChange={toggleNotifications}
              className="rounded text-blue-500 focus:ring-blue-500"
            />
            <label htmlFor="notifications" className="text-sm text-gray-700 dark:text-gray-300">
              Enable Notifications
            </label>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Language Settings</h2>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="p-2 rounded border w-full max-w-xs border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="English" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">English</option>
            <option value="Spanish" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Spanish</option>
            <option value="French" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">French</option>
            <option value="German" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">German</option>
          </select>
        </section>
      </div>
    </main>
  );
}

