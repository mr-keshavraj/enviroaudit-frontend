import ReviewTable from "@/components/review/ReviewTable";

export default function ReviewPage() {

  return (
    <div>

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          ESG Review Workflow
        </h1>

        <p className="text-slate-500 mt-2">
          Validate, approve and lock normalized ESG records.
        </p>

      </div>

      {/* Table */}
      <ReviewTable />

    </div>
  );
}