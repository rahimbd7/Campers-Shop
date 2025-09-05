
import { Navigate, useLocation } from "react-router-dom";
import type React from "react";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSelector";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; 
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
 const currentUser = useAppSelector(selectCurrentUser);
  const user = currentUser?.user;
  const location = useLocation();

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check

  if (allowedRoles && !allowedRoles.includes(user.role as string)) {
    return <Navigate to="/" replace />; 
  }

  return <>{children}</>;
};

export default ProtectedRoute;
