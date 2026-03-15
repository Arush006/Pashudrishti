import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from './MainLayout';

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  if (!token || !user.id) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <MainLayout userRole={user.role}>{children}</MainLayout>;
};

export default ProtectedRoute;
