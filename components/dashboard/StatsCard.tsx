interface Props {
  title: string;
  value: string;
  color: string;
}

export default function StatsCard({
  title,
  value,
  color,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 border">

      {/* Top */}
      <div className="flex items-center justify-between mb-4">

        <h3 className="text-slate-500 text-sm">
          {title}
        </h3>

        <div className={`w-4 h-4 rounded-full ${color}`} />
      </div>

      {/* Value */}
      <p className="text-4xl font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}