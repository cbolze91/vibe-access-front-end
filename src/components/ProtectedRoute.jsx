// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router";
import { useUser } from "../context/useUser";

// Simple gatekeeper: if there is no signed-in user, send them to Sign In.
function ProtectedRoute({ children }) {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}

export default ProtectedRoute;
