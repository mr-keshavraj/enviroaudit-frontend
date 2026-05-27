export default function Navbar() {
  return (
    <div className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">
      
      {/* Project Name */}
      <div>
        <h1 className="text-2xl font-bold text-emerald-700">
          EnviroAudit
        </h1>
      </div>

      {/* Right Side */}
      <div className="text-sm text-slate-500">
        ESG Data Platform
      </div>
    </div>
  );
}