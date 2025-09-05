import { useState } from "react";
import { Sun, Moon, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";

export default function Navbar() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user); // get user from store
  const setUser = useStore((state) => state.setUser);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  // Render basic navbar if user is not loaded
  if (!user) {
    return (
      <nav className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg sticky top-0 z-50">
        <h1 className="text-2xl font-bold tracking-wide">IoT Health Monitor</h1>
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg sticky top-0 z-50">
      <h1 className="text-2xl font-bold tracking-wide">IoT Health Monitor</h1>

      <div className="hidden md:flex items-center gap-6">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-white/20 transition"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-300" />
          ) : (
            <Moon className="w-5 h-5 text-gray-100" />
          )}
        </button>

        <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
          <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center text-indigo-700 font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <span className="font-medium">
            {user.name} ({user.role})
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 px-4 py-1 rounded-full font-medium transition"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <div className="md:hidden flex items-center gap-2">
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="p-2 rounded-full hover:bg-white/20 transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-full right-0 w-48 mt-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg p-4 flex flex-col gap-3 md:hidden">
          <button onClick={toggleTheme} className="flex items-center gap-2">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <span>
            {user.name} ({user.role})
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
