"use client";

import OrganizationsTable from "@/components/organizations/OrganizationsTable";

export default function OrganizationsPage() {

  return (
    <div>

      {/* Page Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-white">
          Organizations
        </h1>

        <p className="text-slate-400 mt-2">
          Manage ESG organizations and tenants.
        </p>

      </div>

      {/* Organizations Table */}
      <OrganizationsTable />

    </div>
  );
}