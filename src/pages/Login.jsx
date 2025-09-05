import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";

export default function Login() {
  const [role, setRole] = useState("patient");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [remember, setRemember] = useState(false);

  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("bg-gray-900", darkMode);
    document.body.classList.toggle("bg-gray-100", !darkMode);
  }, [darkMode]);

  // ✅ Mock users matching useStore
  const mockUsers = {
    doctor: {
      id: 999,
      username: "doctor",
      password: "1234",
      role: "doctor",
      name: "Dr. Smith",
    },
    patientA: {
      id: 1,
      username: "patientA",
      password: "1234",
      role: "patient",
      name: "Patient A",
    },
    patientB: {
      id: 2,
      username: "patientB",
      password: "1234",
      role: "patient",
      name: "Patient B",
    },
  };

  const handleLogin = () => {
    setError("");

    const userData =
      role === "doctor"
        ? mockUsers.doctor
        : username === "patientB"
        ? mockUsers.patientB
        : mockUsers.patientA;

    if (username === userData.username && password === userData.password) {
      setUser(userData);

      if (remember) localStorage.setItem("user", JSON.stringify(userData));
      else localStorage.removeItem("user");

      navigate(userData.role === "doctor" ? "/doctor" : "/patient");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen transition-colors duration-500">
      <div
        className={`w-full max-w-sm p-8 rounded-2xl shadow-2xl border transition-colors duration-500 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm text-gray-400 hover:text-gray-200 transition"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <h2
          className={`text-2xl font-bold mb-6 text-center transition-colors duration-500 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Welcome Back
        </h2>

        <div className="mb-4">
          <label
            className={`block mb-2 font-medium transition-colors duration-500 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Select Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`w-full p-3 rounded-xl transition-colors duration-500 focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 text-white focus:ring-blue-500"
                : "bg-gray-100 text-gray-900 focus:ring-blue-600"
            }`}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full p-3 rounded-xl transition-colors duration-500 focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
                : "bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-blue-600"
            }`}
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 rounded-xl transition-colors duration-500 focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
                : "bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-blue-600"
            }`}
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="remember"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="mr-2 rounded"
          />
          <label htmlFor="remember" className="text-sm text-gray-300">
            Remember me
          </label>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleLogin}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-500 text-white"
              : "bg-blue-500 hover:bg-blue-400 text-white"
          }`}
        >
          Login as {role}
        </button>

        <p
          className={`mt-6 text-center text-sm transition-colors duration-500 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          &copy; 2025 Health Dashboard
        </p>
      </div>
    </div>
  );
}
