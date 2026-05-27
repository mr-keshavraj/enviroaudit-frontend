"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AuditService,
} from "@/services/audit.service";

import {
  AuditLog,
} from "@/types/audit";

/*
-----------------------------------------
Audit Table Component
-----------------------------------------
*/

export default function AuditTable() {

  /*
  -----------------------------------------
  States
  -----------------------------------------
  */

  const [logs, setLogs] =
    useState<AuditLog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("ALL");

  /*
  -----------------------------------------
  Fetch Audit Logs
  -----------------------------------------
  */

  useEffect(() => {

    fetchAuditLogs();

  }, []);

  const fetchAuditLogs = async () => {

    try {

      const response =
        await AuditService.getAuditLogs();

      setLogs(
        response.results || []
      );

    } catch (error) {

      console.error(
        "Audit Fetch Error:",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  /*
  -----------------------------------------
  Filter + Search Logic
  -----------------------------------------
  */

  const filteredLogs = useMemo(() => {

    return logs.filter((log) => {

      const matchesSearch =

        log.action
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        log.entity_type
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        log.performed_by
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFilter =

        filter === "ALL"
          ? true
          : log.action === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });

  }, [
    logs,
    search,
    filter,
  ]);

  /*
  -----------------------------------------
  Action Badge Colors
  -----------------------------------------
  */

  const getBadgeColor = (
    action: string
  ) => {

    switch (action) {

      case "APPROVED":
        return (
          "bg-green-500/20 text-green-400"
        );

      case "REJECTED":
        return (
          "bg-red-500/20 text-red-400"
        );

      case "LOCKED":
        return (
          "bg-slate-500/20 text-slate-300"
        );

      case "IMPORTED":
        return (
          "bg-blue-500/20 text-blue-400"
        );

      default:
        return (
          "bg-orange-500/20 text-orange-300"
        );
    }
  };

  /*
  -----------------------------------------
  Loading State
  -----------------------------------------
  */

  if (loading) {

    return (

      <div className="bg-black rounded-2xl border border-slate-800 p-6">

        <p className="text-slate-300">
          Loading audit logs...
        </p>

      </div>
    );
  }

  return (

    <div className="bg-black rounded-2xl border border-slate-800 overflow-hidden">

      {/* Header */}
      <div className="p-6 border-b border-slate-800">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>

            <h2 className="text-3xl font-bold text-white">
              ESG Audit Trail
            </h2>

            <p className="text-slate-400 mt-2">
              Monitor all ESG activities
              and analyst actions.
            </p>

          </div>

          {/* Count Badge */}
          <div className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-xl font-semibold w-fit">

            {filteredLogs.length} Logs

          </div>

        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">

          {/* Search */}
          <input
            type="text"
            placeholder="Search audit logs..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          />

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white"
          >

            <option value="ALL">
              All Actions
            </option>

            <option value="IMPORTED">
              Imported
            </option>

            <option value="APPROVED">
              Approved
            </option>

            <option value="REJECTED">
              Rejected
            </option>

            <option value="LOCKED">
              Locked
            </option>

          </select>

        </div>

      </div>

      {/* Empty State */}
      {filteredLogs.length === 0 ? (

        <div className="p-10 text-center text-slate-400">

          No audit logs found

        </div>

      ) : (

        <table className="w-full">

          {/* Table Header */}
          <thead className="bg-[#111827]">

            <tr>

              <th className="p-4 text-left text-white">
                Action
              </th>

              <th className="p-4 text-left text-white">
                Entity
              </th>

              <th className="p-4 text-left text-white">
                Performed By
              </th>

              <th className="p-4 text-left text-white">
                Time
              </th>

            </tr>

          </thead>

          {/* Table Body */}
          <tbody>

            {filteredLogs.map((log) => (

              <tr
                key={log.id}
                className="border-t border-slate-800 hover:bg-[#111827]"
              >

                {/* Action */}
                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor(log.action)}`}
                  >
                    {log.action}
                  </span>

                </td>

                {/* Entity */}
                <td className="p-4 text-white">

                  {log.entity_type}

                </td>

                {/* Performed By */}
                <td className="p-4 text-slate-300">

                  {log.performed_by}

                </td>

                {/* Time */}
                <td className="p-4 text-slate-400 text-sm">

                  {
                    new Date(
                      log.performed_at
                    ).toLocaleString()
                  }

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}