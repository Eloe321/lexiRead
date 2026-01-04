import { create } from "zustand";

// Types
export interface Patient {
  id: string;
  name: string;
  gender: string;
  age: string;
  screeningType: string;
  date: string;
  status: "In Progress" | "Completed" | "Pending Review";
  initials: string;
  color: string;
}

export interface DashboardStats {
  totalPatients: number;
  inProgress: number;
  completed: number;
  pendingReview: number;
}

export interface DashboardState {
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Stats
  stats: DashboardStats;
  setStats: (stats: DashboardStats) => void;

  // Patients
  patients: Patient[];
  setPatients: (patients: Patient[]) => void;
  filteredPatients: () => Patient[];

  // Pagination
  currentPage: number;
  pageSize: number;
  setCurrentPage: (page: number) => void;

  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Notifications
  notificationCount: number;
  setNotificationCount: (count: number) => void;
}

// Mock data for initial state
const mockPatients: Patient[] = [
  {
    id: "#PT-8832",
    name: "Oliver Smith",
    gender: "Male",
    age: "8 yrs",
    screeningType: "Rapid Naming Test",
    date: "Oct 24, 2023",
    status: "In Progress",
    initials: "OS",
    color: "bg-green-100 text-green-600",
  },
  {
    id: "#PT-9941",
    name: "Emma Jones",
    gender: "Female",
    age: "10 yrs",
    screeningType: "Phonological Awareness",
    date: "Oct 23, 2023",
    status: "Completed",
    initials: "EJ",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "#PT-7723",
    name: "Lucas Brown",
    gender: "Male",
    age: "7 yrs",
    screeningType: "Reading Fluency",
    date: "Oct 22, 2023",
    status: "Pending Review",
    initials: "LB",
    color: "bg-sky-100 text-sky-600",
  },
  {
    id: "#PT-6554",
    name: "Sarah Jenkins",
    gender: "Female",
    age: "9 yrs",
    screeningType: "RAN (Colors)",
    date: "Oct 22, 2023",
    status: "Completed",
    initials: "SJ",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "#PT-5421",
    name: "Michael Chen",
    gender: "Male",
    age: "11 yrs",
    screeningType: "Visual Processing",
    date: "Oct 21, 2023",
    status: "In Progress",
    initials: "MC",
    color: "bg-pink-100 text-pink-600",
  },
];

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Search
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Stats
  stats: {
    totalPatients: 150,
    inProgress: 12,
    completed: 45,
    pendingReview: 8,
  },
  setStats: (stats) => set({ stats }),

  // Patients
  patients: mockPatients,
  setPatients: (patients) => set({ patients }),
  filteredPatients: () => {
    const { patients, searchQuery } = get();
    if (!searchQuery.trim()) return patients;

    const query = searchQuery.toLowerCase();
    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query)
    );
  },

  // Pagination
  currentPage: 1,
  pageSize: 5,
  setCurrentPage: (page) => set({ currentPage: page }),

  // Loading
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  // Notifications
  notificationCount: 3,
  setNotificationCount: (count) => set({ notificationCount: count }),
}));
