import Link from "next/link";

const menus = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Organizations",
    href: "/organizations",
  },
  {
    label: "Upload",
    href: "/upload",
  },
  {
    label: "Review",
    href: "/review",
  },
  {
    label: "Audit",
    href: "/audit",
  },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-6">
      
      {/* Logo */}
      <h2 className="text-3xl font-bold text-emerald-400 mb-10">
        ESG Nexus
      </h2>

      {/* Menu */}
      <div className="flex flex-col gap-4">
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className="p-3 rounded-lg hover:bg-slate-800 transition"
          >
            {menu.label}
          </Link>
        ))}
      </div>
    </div>
  );
}