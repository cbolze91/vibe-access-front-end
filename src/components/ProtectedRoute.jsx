import { useContext } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../context/UserContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}

export default ProtectedRoute;