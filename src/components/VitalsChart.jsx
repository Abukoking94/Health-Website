import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts";
import { HeartPulse, Activity, Droplets } from "lucide-react";

export default function VitalsChart({ data, dataKey, label }) {
  // Dynamic colors & icons based on vital type
  let color = "#3b82f6"; // default blue
  let icon = null;
  let criticalHigh = 200;
  let criticalLow = 0;

  if (label.toLowerCase().includes("heart")) {
    color = "#ef4444"; // red
    icon = <HeartPulse className="w-5 h-5 text-red-500" />;
    criticalHigh = 100;
  } else if (label.toLowerCase().includes("oxygen")) {
    color = "#0ea5e9"; // cyan/blue
    icon = <Activity className="w-5 h-5 text-blue-500" />;
    criticalLow = 92;
  } else if (label.toLowerCase().includes("glucose")) {
    color = "#9333ea"; // purple
    icon = <Droplets className="w-5 h-5 text-purple-500" />;
    criticalHigh = 140;
  }

  // Determine dynamic gradient based on last value
  const latestValue = data[data.length - 1]?.[dataKey] || 0;
  const intensity =
    latestValue > criticalHigh || latestValue < criticalLow ? 0.6 : 0.35;

  return (
    <div className="relative p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 hover:scale-[1.02] transition-transform duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {label}
        </h3>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          {/* Axis */}
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            tickLine={false}
            axisLine={false}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              fontSize: "14px",
            }}
            labelStyle={{ color: "#374151", fontWeight: "600" }}
          />

          {/* Gradient fill */}
          <defs>
            <linearGradient id={`color-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={intensity} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Area under line */}
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fillOpacity={1}
            fill={`url(#color-${dataKey})`}
          />

          {/* Smooth animated line */}
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: color, strokeWidth: 2, stroke: "#fff" }}
            isAnimationActive={true}
            animationDuration={900}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Glow effect for critical */}
      {(latestValue > criticalHigh || latestValue < criticalLow) && (
        <span
          className="absolute top-0 left-0 w-full h-full rounded-2xl pointer-events-none"
          style={{
            boxShadow: `0 0 20px 5px ${color}80`,
          }}
        />
      )}
    </div>
  );
}
