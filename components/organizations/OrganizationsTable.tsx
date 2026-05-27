"use client";

import { useEffect, useState } from "react";

import { OrganizationService } from "@/services/organization.service";

import {
  Organization,
  PaginatedOrganizations,
} from "@/types/organization";

export default function OrganizationsTable() {

  const [organizations, setOrganizations] =
    useState<Organization[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    fetchOrganizations();

  }, []);

  const fetchOrganizations = async () => {

    try {

      setLoading(true);

      const response:
        PaginatedOrganizations =
        await OrganizationService.getOrganizations();

      setOrganizations(
        response.results
      );

    } catch (err) {

      console.error(err);

      setError(
        "Failed to load organizations"
      );

    } finally {

      setLoading(false);
    }
  };

  // Loading State
  if (loading) {

    return (
      <div className="bg-white rounded-2xl shadow p-10 text-center">

        <p className="text-slate-500 text-lg">
          Loading organizations...
        </p>

      </div>
    );
  }

  // Error State
  if (error) {

    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">

        <p className="text-red-600">
          {error}
        </p>

      </div>
    );
  }

  // Empty State
  if (organizations.length === 0) {

    return (
      <div className="bg-white rounded-2xl shadow p-10 text-center">

        <h2 className="text-2xl font-semibold mb-3">
          No Organizations Found
        </h2>

        <p className="text-slate-500">
          Create organizations from Django Admin.
        </p>

      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">

      {/* Header */}
      <div className="p-6 border-b flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Organizations
          </h2>

          <p className="text-slate-500 mt-1">
            ESG tenant management
          </p>

        </div>

        <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl font-medium">

          {organizations.length} Records

        </div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-4">
                Company
              </th>

              <th className="text-left p-4">
                Industry
              </th>

              <th className="text-left p-4">
                Country
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Created
              </th>

            </tr>

          </thead>

          <tbody>

            {organizations.map(
              (organization) => (

              <tr
                key={organization.id}
                className="border-t hover:bg-slate-50 transition"
              >

                {/* Company */}
                <td className="p-4">

                  <div>

                    <p className="font-semibold text-slate-800">
                      {organization.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {organization.id.slice(0, 8)}
                    </p>

                  </div>

                </td>

                {/* Industry */}
                <td className="p-4">

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                    {organization.industry}

                  </span>

                </td>

                {/* Country */}
                <td className="p-4 text-slate-700">

                  {organization.country}

                </td>

                {/* Status */}
                <td className="p-4">

                  {organization.is_active ? (

                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">

                      Active

                    </span>

                  ) : (

                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">

                      Inactive

                    </span>

                  )}

                </td>

                {/* Created */}
                <td className="p-4 text-slate-500 text-sm">

                  {new Date(
                    organization.created_at
                  ).toLocaleDateString()}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}