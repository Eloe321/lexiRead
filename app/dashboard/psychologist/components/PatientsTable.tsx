"use client";

import { memo, useCallback } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Eye,
  Pencil,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboardStore, type Patient } from "@/app/lib/stores";

function getStatusBadge(status: Patient["status"]) {
  switch (status) {
    case "Completed":
      return (
        <span className="inline-flex items-center gap-1 text-xs text-green-600">
          <CheckCircle className="h-3 w-3" />
          Completed
        </span>
      );
    case "In Progress":
      return (
        <span className="inline-flex items-center gap-1 text-xs text-sky-600">
          <Clock className="h-3 w-3" />
          In Progress
        </span>
      );
    case "Pending Review":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-600 rounded text-xs">
          <AlertCircle className="h-3 w-3" />
          Pending Review
        </span>
      );
    default:
      return null;
  }
}

function PatientsTableComponent() {
  // Subscribe to filtered patients and pagination
  const filteredPatients = useDashboardStore((state) => state.filteredPatients);
  const currentPage = useDashboardStore((state) => state.currentPage);
  const pageSize = useDashboardStore((state) => state.pageSize);
  const setCurrentPage = useDashboardStore((state) => state.setCurrentPage);
  const stats = useDashboardStore((state) => state.stats);

  const patients = filteredPatients();

  // Calculate pagination
  const totalPages = Math.ceil(patients.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedPatients = patients.slice(startIndex, startIndex + pageSize);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, setCurrentPage]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages, setCurrentPage]);

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">Recent Patients</h2>
        <Link
          href="/dashboard/psychologist/patients"
          className="text-sm text-sky-500 hover:text-sky-600 flex items-center gap-1"
        >
          View All
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                Patient Name
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                ID
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                Age
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                Screening Type
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                Date
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                Status
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedPatients.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-gray-500">
                  No patients found matching your search.
                </td>
              </tr>
            ) : (
              paginatedPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-b border-gray-50 hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full ${patient.color} flex items-center justify-center font-medium text-sm`}
                      >
                        {patient.initials}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {patient.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {patient.gender}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">
                    {patient.id}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">
                    {patient.age}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">
                    {patient.screeningType}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">
                    {patient.date}
                  </td>
                  <td className="px-5 py-4">
                    {getStatusBadge(patient.status)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
          <span className="font-medium">
            {Math.min(startIndex + pageSize, patients.length)}
          </span>{" "}
          of <span className="font-medium">{stats.totalPatients}</span> results
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={handlePrevious}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export const PatientsTable = memo(PatientsTableComponent);
