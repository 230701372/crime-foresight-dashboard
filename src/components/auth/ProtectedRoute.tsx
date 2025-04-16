
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { checkAuth } = useAuth();
  
  if (!checkAuth()) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
