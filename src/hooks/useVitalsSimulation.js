import { useEffect } from "react";
import useStore from "../store/useStore";

export default function useVitalsSimulation(patientId) {
  const updatePatientVitals = useStore((state) => state.updatePatientVitals);

  useEffect(() => {
    if (!patientId) return; // no patient yet, do nothing

    const interval = setInterval(() => {
      updatePatientVitals(patientId, {
        heartRate: 60 + Math.floor(Math.random() * 40),
        oxygen: 90 + Math.floor(Math.random() * 10),
        glucose: 80 + Math.floor(Math.random() * 40),
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [patientId, updatePatientVitals]);
}
