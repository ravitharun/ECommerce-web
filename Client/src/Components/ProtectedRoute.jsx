import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, user, allowedRoles = [] }) {
  if (!user?.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
}

export default ProtectedRoute;
