"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

/**
 * Month-by-month signups area chart.
 * `data` is the timeline array from the stats endpoint: [{ month, count }].
 */
export default function SignupChart({ data = [], title = "Signups over time" }) {
  const isEmpty = !data.length || data.every((d) => d.count === 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="h-64">
        {isEmpty ? (
          <div className="h-full flex items-center justify-center text-sm text-gray-400">
            No signups in this period
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="signupFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ stroke: "#eab308", strokeWidth: 1 }}
                contentStyle={{
                  borderRadius: "0.5rem",
                  border: "1px solid #e5e7eb",
                  fontSize: "0.8rem",
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                name="Signups"
                stroke="#eab308"
                strokeWidth={2}
                fill="url(#signupFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
