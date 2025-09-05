import { useState, useEffect } from "react";
import useStore from "../store/useStore";
import ChatBox from "../components/ChatBox";
import Navbar from "../components/Navbar";
import VitalsCard from "../components/VitalsCard";
import VitalsChart from "../components/VitalsChart";
import AlertsPanel from "../components/AlertsPanel";
import useVitalsSimulation from "../hooks/useVitalsSimulation";

export default function PatientDashboard({ user }) {
  const patients = useStore((state) => state.patients);
  const doctor = useStore((state) => state.doctor);
  const patient = patients?.[0];

  const [history, setHistory] = useState([]);
  useVitalsSimulation(patient?.id);

  useEffect(() => {
    if (!patient) return;
    const time = new Date().toLocaleTimeString();
    setHistory((prev) =>
      prev.length === 0 || prev[prev.length - 1].time !== time
        ? [...prev, { ...patient.vitals, time }]
        : prev
    );
  }, [patient?.vitals]);

  if (!patient)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200">
        No patient data available
      </div>
    );

  return (
    <div className="min-h-screen p-6 space-y-6 bg-gray-900 text-gray-200">
      <Navbar user={user} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VitalsCard
          label="Heart Rate"
          value={patient.vitals.heartRate}
          unit="bpm"
        />
        <VitalsCard
          label="Oxygen Level"
          value={patient.vitals.oxygen}
          unit="%"
        />
        <VitalsCard
          label="Glucose"
          value={patient.vitals.glucose}
          unit="mg/dL"
        />
        <AlertsPanel vitals={patient.vitals} />
        <VitalsChart
          data={history}
          dataKey="heartRate"
          label="Heart Rate Trend"
        />
        <VitalsChart data={history} dataKey="oxygen" label="Oxygen Trend" />
        <VitalsChart data={history} dataKey="glucose" label="Glucose Trend" />
        <ChatBox otherUser={{ username: "doctor" }} />
      </div>
    </div>
  );
}
