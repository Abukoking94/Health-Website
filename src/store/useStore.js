import { create } from "zustand";
import { getConversationId } from "../utils/chat";

const useStore = create((set) => ({
  // Current logged-in user
  user: JSON.parse(localStorage.getItem("user")) || null,

  // Sample doctor
  doctor: { id: 999, username: "doctor", name: "Dr. Smith", role: "doctor" },

  // Sample patients
  patients: [
    {
      id: 1,
      username: "patientA",
      name: "Patient A",
      role: "patient",
      vitals: { heartRate: 72, oxygen: 98, glucose: 90 },
    },
    {
      id: 2,
      username: "patientB",
      name: "Patient B",
      role: "patient",
      vitals: { heartRate: 80, oxygen: 95, glucose: 110 },
    },
  ],

  // Conversations: { "username1_username2": [messages] }
  conversations: {},

  // Set current user
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },

  // Logout
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },

  // Update vitals
  updatePatientVitals: (id, vitals) =>
    set((state) => ({
      patients: state.patients.map((p) => (p.id === id ? { ...p, vitals } : p)),
    })),

  // Add a message to a conversation
  addMessage: (conversationId, message) =>
    set((state) => ({
      conversations: {
        ...state.conversations,
        [conversationId]: [
          ...(state.conversations[conversationId] || []),
          message,
        ],
      },
    })),
}));

export default useStore;
