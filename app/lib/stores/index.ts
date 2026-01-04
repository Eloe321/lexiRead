// Re-export all stores for easy importing
export { useAuthStore } from "./auth.store";
export type { User, AuthState } from "./auth.store";

export { useDashboardStore } from "./dashboard.store";
export type {
  Patient,
  DashboardStats,
  DashboardState,
} from "./dashboard.store";
