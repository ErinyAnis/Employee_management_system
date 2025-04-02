import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
  requiredRole: string[];
}

const RoleBaseRoutes = ({ children, requiredRole }: Props) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="m-3">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // requiredRole will be an array and will pass the role to it
  if (!requiredRole.includes(user?.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return user ? children : <Navigate to="/login" />;
};

export default RoleBaseRoutes;
