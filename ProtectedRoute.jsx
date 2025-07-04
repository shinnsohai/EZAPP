import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminLogin from '../admin/AdminLogin';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#6B7280'
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return children;
};

export default ProtectedRoute;

