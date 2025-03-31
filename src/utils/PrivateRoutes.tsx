// check the user if logged in or not

interface Props {
  children: React.ReactNode;
}

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = ({ children }: Props) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="m-3">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
