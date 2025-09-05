import { useState } from "react";
import useStore from "../store/useStore";
import Navbar from "../components/Navbar";
import PatientList from "../components/PatientList";
import VitalsCard from "../components/VitalsCard";
import AlertsPanel from "../components/AlertsPanel";
import ChatBox from "../components/ChatBox";

export default function DoctorDashboard({ user }) {
  const patients = useStore((state) => state.patients);
  const [selectedId, setSelectedId] = useState(null);
  const patient = patients.find((p) => p.id === selectedId);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6 space-y-6">
      <Navbar user={user} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PatientList onSelect={setSelectedId} />
        {patient ? (
          <div className="md:col-span-2 flex flex-col gap-6 w-full">
            <h2 className="text-2xl font-bold text-white truncate">
              {patient.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <VitalsCard
                label="Heart Rate"
                value={patient.vitals.heartRate}
                unit="bpm"
              />
              <VitalsCard
                label="Oxygen"
                value={patient.vitals.oxygen}
                unit="%"
              />
              <VitalsCard
                label="Glucose"
                value={patient.vitals.glucose}
                unit="mg/dL"
              />
            </div>
            <AlertsPanel vitals={patient.vitals} />
            <ChatBox otherUser={{ username: patient.username }} />
          </div>
        ) : (
          <div className="md:col-span-2 flex items-center justify-center text-gray-400 italic">
            Select a patient to view details and chat
          </div>
        )}
      </div>
    </div>
  );
}
