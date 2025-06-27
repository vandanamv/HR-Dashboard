import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBookmarkStore = create(
  persist(
    (set, get) => ({
      bookmarks: [],

      addBookmark: (user) => {
  const exists = get().bookmarks.some((u) => u.id === user.id);
  if (!exists) {
    set({
      bookmarks: [
        ...get().bookmarks,
        {
          ...user,
          bookmarkedAt: new Date().toISOString(), // Add timestamp here
        },
      ],
    });
  }
},


      removeBookmark: (id) =>
        set({ bookmarks: get().bookmarks.filter((u) => u.id !== id) }),

      clearBookmarks: () => set({ bookmarks: [] }),
    }),
    {
      name: "hr-bookmarks", // key in localStorage
    }
  )
);
