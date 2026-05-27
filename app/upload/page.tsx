import UploadForm from "@/components/upload/UploadForm";

export default function UploadPage() {
  return (
    <div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Upload ESG Data
        </h1>

        <p className="text-slate-500 mt-2">
          Upload SAP, Utility or Travel CSV files.
        </p>
      </div>

      <UploadForm />

    </div>
  );
}