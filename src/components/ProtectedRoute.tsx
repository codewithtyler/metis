import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}