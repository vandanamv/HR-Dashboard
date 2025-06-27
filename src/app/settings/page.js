//src/app/settings/page.js
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("mock-email");
    const name = localStorage.getItem("mock-name");
    const avatar = localStorage.getItem("mock-avatar");
    const darkTheme = localStorage.getItem("mock-theme") === "dark";

    if (!email) {
      router.push("/login");
    } else {
      setUserEmail(email);
      setUserName(name || "User");
      setNewName(name || "");
      setAvatarUrl(avatar);
      setIsDark(darkTheme);
      document.documentElement.classList.toggle("dark", darkTheme);
    }
  }, [router]);

  const handleSave = () => {
    localStorage.setItem("mock-name", newName);
    setUserName(newName);
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("mock-email");
    localStorage.removeItem("mock-name");
    localStorage.removeItem("mock-avatar");
    localStorage.removeItem("mock-theme");
    router.push("/login");
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result;
        setAvatarUrl(url);
        localStorage.setItem("mock-avatar", url);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("mock-theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">⚙️ Profile Settings</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-6">
        <div className="flex items-center space-x-4">
          <img
            src={avatarUrl || "/default-avatar.png"}
            alt="Avatar"
            className="w-16 h-16 rounded-full object-cover border"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="text-sm text-blue-500 hover:underline"
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

        <div>
          <label className="font-semibold block text-sm">Name:</label>
          {editing ? (
            <div className="flex items-center space-x-2">
              <input
                className="p-1 rounded border dark:bg-gray-700 dark:text-white"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-2 py-1 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-lg text-blue-700 dark:text-blue-300">{userName}</p>
              <button
                onClick={() => setEditing(true)}
                className="text-sm text-blue-500 hover:underline"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="font-semibold block text-sm">Email:</label>
          <p className="text-gray-700 dark:text-gray-200">{userEmail}</p>
        </div>

        <div>
          <label className="font-semibold block text-sm">Theme:</label>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded border text-sm mt-2 bg-gray-100 dark:bg-gray-700 dark:text-white"
          >
            Switch to {isDark ? "Light" : "Dark"}
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded mt-4"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
