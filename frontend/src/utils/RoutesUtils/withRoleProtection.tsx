import React from "react";
import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute';


export const withRoleProtection = (
  routes: { path: string; element: React.ReactNode }[],
  allowedRoles: string[]
) => {
  return routes.map((route) => ({
    ...route,
    element: (
      <ProtectedRoute allowedRoles={allowedRoles}>
        {route.element}
      </ProtectedRoute>
    ),
  }));
};
