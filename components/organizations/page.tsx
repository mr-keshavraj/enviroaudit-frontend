import OrganizationsTable from "@/components/organizations/OrganizationsTable";

export default function OrganizationsPage() {

  return (
    <div>

      {/* Page Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Organization Management
        </h1>

        <p className="text-slate-500 mt-2">
          Manage ESG organizations and business entities.
        </p>

      </div>

      {/* Table */}
      <OrganizationsTable />

    </div>
  );
}