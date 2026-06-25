"use client";

/**
 * A single KPI tile for the admin dashboards.
 * Pass an `accent` ("yellow" | "blue" | "purple" | "green" | "red" | "gray")
 * to tint the icon chip and value.
 */
const ACCENTS = {
  yellow: { chip: "bg-yellow-100 text-yellow-600", value: "text-gray-900" },
  blue: { chip: "bg-blue-100 text-blue-600", value: "text-gray-900" },
  purple: { chip: "bg-purple-100 text-purple-600", value: "text-gray-900" },
  green: { chip: "bg-green-100 text-green-600", value: "text-gray-900" },
  red: { chip: "bg-red-100 text-red-600", value: "text-gray-900" },
  gray: { chip: "bg-gray-100 text-gray-600", value: "text-gray-900" },
};

export default function StatCard({ icon: Icon, label, value, accent = "yellow", hint }) {
  const colors = ACCENTS[accent] || ACCENTS.yellow;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
      {Icon && (
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colors.chip}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-500 truncate">
          {label}
        </p>
        <p className={`text-2xl font-bold mt-0.5 ${colors.value}`}>{value}</p>
        {hint && <p className="text-xs text-gray-400 mt-0.5 truncate">{hint}</p>}
      </div>
    </div>
  );
}
