import AuditTable from "@/components/audit/AuditTable";

export default function AuditPage() {
  return (
    <div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Audit Logs
        </h1>

        <p className="text-slate-500 mt-2">
          Track every ESG activity and analyst action.
        </p>
      </div>

      <AuditTable />

    </div>
  );
}