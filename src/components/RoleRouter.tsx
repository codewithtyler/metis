import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './dashboards/AdminDashboard';
import TeamDashboard from './dashboards/TeamDashboard';
import UserDashboard from './dashboards/UserDashboard';

export default function RoleRouter({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  switch (user.role) {
    case 'admin':
      return <AdminDashboard>{children}</AdminDashboard>;
    case 'agent':
      return <TeamDashboard>{children}</TeamDashboard>;
    case 'customer':
      return <UserDashboard>{children}</UserDashboard>;
    default:
      return <Navigate to="/login" replace />;
  }
}