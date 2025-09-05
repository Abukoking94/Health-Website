import {
  AlertTriangle,
  CheckCircle2,
  HeartPulse,
  Activity,
  Droplets,
} from "lucide-react";

export default function AlertsPanel({ vitals }) {
  const alerts = [];

  if (vitals.heartRate > 100) {
    alerts.push({
      msg: "High heart rate detected!",
      color: "red",
      icon: <HeartPulse className="w-5 h-5 text-red-500" />,
    });
  }
  if (vitals.oxygen < 92) {
    alerts.push({
      msg: "Low oxygen level!",
      color: "orange",
      icon: <Activity className="w-5 h-5 text-orange-500" />,
    });
  }
  if (vitals.glucose > 140) {
    alerts.push({
      msg: "High glucose level!",
      color: "yellow",
      icon: <Droplets className="w-5 h-5 text-yellow-500" />,
    });
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        Alerts & Notifications
      </h3>

      {alerts.length > 0 ? (
        <ul className="space-y-2">
          {alerts.map((a, i) => (
            <li
              key={i}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg shadow-md
                transition-all duration-300 transform hover:scale-[1.02]
                ${
                  a.color === "red"
                    ? "bg-red-50 border-red-200 text-red-700"
                    : ""
                }
                ${
                  a.color === "orange"
                    ? "bg-orange-50 border-orange-200 text-orange-700"
                    : ""
                }
                ${
                  a.color === "yellow"
                    ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                    : ""
                }
                relative
              `}
            >
              {a.icon}
              {a.msg}

              {/* Glow effect for critical alert */}
              <span
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  boxShadow:
                    a.color === "red"
                      ? "0 0 12px 2px #ef444480"
                      : a.color === "orange"
                      ? "0 0 12px 2px #f9731680"
                      : "0 0 12px 2px #fde04780",
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded-lg shadow-md transition-all duration-300 hover:scale-[1.01]">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          All vitals are within normal range
        </div>
      )}
    </div>
  );
}
