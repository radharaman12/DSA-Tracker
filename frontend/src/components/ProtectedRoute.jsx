import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <p style={{ color: 'var(--text)', fontSize: '1.1rem' }}>Checking authorization...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to login while preserving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
