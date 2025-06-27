// store/useAuthStore.js
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  login: (email, password) => {
    // Mock credentials
    const validEmail = "admin@gmail.com";
    const validPassword = "password";

    if (email === validEmail && password === validPassword) {
      set({ isAuthenticated: true });
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    } else {
      set({ isAuthenticated: false });
      return false;
    }
  },
  checkAuth: () => {
    // Check if the user is authenticated (e.g., by checking localStorage)
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    set({ isAuthenticated: isAuth });
    return isAuth;
  },
}));

export default useAuthStore;
