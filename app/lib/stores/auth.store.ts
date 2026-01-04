import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Role } from "@/app/lib/validations/auth";

// Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role | null;
}

export interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Registration flow state
  registrationStep: number;
  selectedRole: Role | null;

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedRole: (role: Role | null) => void;
  setRegistrationStep: (step: number) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  registrationStep: 1,
  selectedRole: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          error: null,
        }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error, isLoading: false }),

      setSelectedRole: (role) => set({ selectedRole: role }),

      setRegistrationStep: (step) => set({ registrationStep: step }),

      clearError: () => set({ error: null }),

      reset: () => set(initialState),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        selectedRole: state.selectedRole,
      }),
    }
  )
);
