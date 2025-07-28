import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, user }) {
    console.log(user.role,"user ")
  if (!user?.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (user.role != "customer") {
    return <Navigate to="/not-authorized" />;
  }

  return children;
}

export default ProtectedRoute;
