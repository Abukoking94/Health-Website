import { HeartPulse, Activity, Droplets } from "lucide-react";

export default function VitalsCard({ label, value, unit }) {
  let icon = null;
  let color = "text-gray-700";
  let barColor = "bg-gray-300";
  let critical = false;

  // Dynamic icons, colors, and critical flag
  if (label.toLowerCase().includes("heart")) {
    icon = <HeartPulse className="w-6 h-6 text-red-500" />;
    if (value > 100) {
      color = "text-red-600";
      barColor = "bg-red-500";
      critical = true;
    } else {
      color = "text-green-600";
      barColor = "bg-green-500";
    }
  } else if (label.toLowerCase().includes("oxygen")) {
    icon = <Activity className="w-6 h-6 text-blue-500" />;
    if (value < 92) {
      color = "text-orange-600";
      barColor = "bg-orange-500";
      critical = true;
    } else {
      color = "text-green-600";
      barColor = "bg-green-500";
    }
  } else if (label.toLowerCase().includes("glucose")) {
    icon = <Droplets className="w-6 h-6 text-purple-500" />;
    if (value > 140) {
      color = "text-yellow-600";
      barColor = "bg-yellow-500";
      critical = true;
    } else {
      color = "text-green-600";
      barColor = "bg-green-500";
    }
  }

  // Normalize value for progress bar
  const progress = Math.min((value / 200) * 100, 100);

  return (
    <div
      className={`relative p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
    >
      {/* Glow effect if critical */}
      {critical && (
        <span
          className="absolute top-0 left-0 w-full h-full rounded-2xl pointer-events-none"
          style={{
            boxShadow: `0 0 20px 5px ${
              color.includes("red")
                ? "#ef444480"
                : color.includes("orange")
                ? "#f9731680"
                : "#fde04780"
            }`,
          }}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-base font-medium text-gray-700 dark:text-gray-200">
            {label}
          </h3>
        </div>
        <p className={`text-2xl font-bold ${color}`}>
          {value}{" "}
          <span className="text-lg font-normal text-gray-500 dark:text-gray-300">
            {unit}
          </span>
        </p>
      </div>

      {/* Animated Progress Bar */}
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative z-10">
        <div
          className={`${barColor} h-3 rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
