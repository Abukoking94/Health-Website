import { useState, useEffect } from "react";
import useStore from "../store/useStore";

export default function PatientList({ onSelect }) {
  const patients = useStore((state) => state.patients);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [prevVitals, setPrevVitals] = useState({});

  // Track previous vitals for animation
  useEffect(() => {
    const vitalsSnapshot = {};
    patients.forEach((p) => {
      vitalsSnapshot[p.id] = { ...p.vitals };
    });
    setPrevVitals(vitalsSnapshot);
  }, [patients]);

  const filtered = patients
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (!sortKey) return 0;
      return b.vitals[sortKey] - a.vitals[sortKey];
    });

  const getBadgeColor = (label, value) => {
    if (label === "heartRate")
      return value > 100 ? "bg-red-600" : "bg-green-600";
    if (label === "oxygen") return value < 92 ? "bg-orange-500" : "bg-blue-600";
    if (label === "glucose")
      return value > 140 ? "bg-yellow-500" : "bg-purple-600";
    return "bg-gray-600";
  };

  const isVitalChanged = (id, label, value) => {
    return prevVitals[id]?.[label] !== value;
  };

  return (
    <div className="p-4 bg-gray-900 text-gray-200 rounded-2xl shadow-xl border border-gray-700 w-full max-w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 gap-3">
        <h3 className="font-semibold text-lg flex-shrink-0 truncate max-w-full">
          Patients
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full lg:w-auto flex-wrap">
          <input
            type="text"
            placeholder="Search patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[180px] px-3 py-2 rounded-full bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto truncate"
          />
          <select
            value={sortKey || ""}
            onChange={(e) => setSortKey(e.target.value || null)}
            className="min-w-[120px] px-3 py-2 rounded-full bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 truncate"
          >
            <option value="">Sort by</option>
            <option value="heartRate">Heart Rate</option>
            <option value="oxygen">Oxygen</option>
            <option value="glucose">Glucose</option>
          </select>
        </div>
      </div>

      {/* Patient Cards */}
      <ul className="grid grid-cols-1 gap-4 auto-rows-fr 2xl:grid-cols-2 3xl:grid-cols-3">
        {filtered.map((p) => {
          const isCritical =
            p.vitals.heartRate > 100 ||
            p.vitals.oxygen < 92 ||
            p.vitals.glucose > 140;

          return (
            <li
              key={p.id}
              onClick={() => onSelect(p.id)}
              className={`cursor-pointer p-4 rounded-xl flex flex-col justify-between shadow hover:scale-[1.03] transition-transform duration-200 break-inside-avoid bg-gray-800 hover:bg-gray-700 ${
                isCritical
                  ? "border-2 border-red-500"
                  : "border border-gray-700"
              }`}
            >
              {/* Name and arrow */}
              <div className="flex justify-between items-center mb-2 flex-shrink-0">
                <p className="font-medium text-gray-100 truncate max-w-[70%]">
                  {p.name}
                </p>
                <div className="text-gray-400 text-xs flex-shrink-0">→</div>
              </div>

              {/* Vitals badges with animation */}
              <div className="flex flex-wrap gap-2">
                {["heartRate", "oxygen", "glucose"].map((vital) => {
                  const changed = isVitalChanged(p.id, vital, p.vitals[vital]);
                  return (
                    <span
                      key={vital}
                      className={`${getBadgeColor(
                        vital,
                        p.vitals[vital]
                      )} text-white px-3 py-1 rounded-full text-sm font-medium transition-all duration-500 ${
                        changed ? "animate-pulse scale-105" : ""
                      } truncate max-w-full`}
                    >
                      {vital === "heartRate"
                        ? "❤️"
                        : vital === "oxygen"
                        ? "O₂"
                        : "Glu"}{" "}
                      {p.vitals[vital]}
                    </span>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
