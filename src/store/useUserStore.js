// ✅ Zustand Store (src/store/useUserStore.js)
import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  users: [],
  setUsers: (data) => set({ users: data }),
  getUserById: (id) =>
    (get().users || []).find((u) => u.id.toString() === id.toString()),
  addUser: (user) =>
    set((state) => ({ users: [...state.users, { ...user, id: Date.now() }] })),
  editUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === updatedUser.id ? { ...u, ...updatedUser } : u
      ),
    })),
  deleteUser: (id) =>
    set((state) => ({ users: state.users.filter((u) => u.id !== id) })),
}));