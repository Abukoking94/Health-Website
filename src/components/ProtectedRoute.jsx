import { Navigate } from "react-router-dom";
import useStore from "../store/useStore";

export default function ProtectedRoute({ children, role }) {
  const user = useStore((state) => state.user);

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Logged in but wrong role
    return <Navigate to="/login" replace />;
  }

  return children;
}
