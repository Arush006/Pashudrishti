import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Shared/Sidebar';
import ProtectedRoute from './components/Shared/ProtectedRoute';
import { LayoutDashboard, Users, TestTube, MapPin, Bell, Stethoscope, Calendar, FileText, Home, User } from 'lucide-react';

// Auth
import LoginPage from './components/Auth/LoginPage';

// Admin
import AdminDashboard from './components/Admin/AdminDashboard';
import DoctorManagement from './components/Admin/DoctorManagement';
import UserManagement from './components/Admin/UserManagement';
import DiseaseManagement from './components/Admin/DiseaseManagement';
import LocationMonitoring from './components/Admin/LocationMonitoring';
import Notifications from './components/Admin/Notifications';

// Doctor
import DoctorDashboard from './components/Doctor/DoctorDashboard';
import DoctorMyCases from './components/Doctor/MyCases';
import DoctorAppointments from './components/Doctor/Appointments';
import DoctorProfile from './components/Doctor/Profile';
import CaseRequests from './components/Doctor/CaseRequests';
import CaseHistory from './components/Doctor/CaseHistory';

// User
import UserDashboard from './components/User/UserDashboard';
import SubmitCase from './components/User/SubmitCase';
import MyCases from './components/User/MyCases';
import NearbyDoctors from './components/User/NearbyDoctors';
import Profile from './components/User/Profile';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!user.role;

  const adminMenuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Doctors', path: '/admin/doctors', icon: <Stethoscope size={20} /> },
    { label: 'Users', path: '/admin/users', icon: <Users size={20} /> },
    { label: 'Diseases', path: '/admin/diseases', icon: <TestTube size={20} /> },
    { label: 'Location', path: '/admin/location', icon: <MapPin size={20} /> },
    { label: 'Notifications', path: '/admin/notifications', icon: <Bell size={20} /> },
  ];

  const doctorMenuItems = [
    { label: 'Dashboard', path: '/doctor/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'My Cases', path: '/doctor/mycases', icon: <FileText size={20} /> },
    { label: 'Appointments', path: '/doctor/appointments', icon: <Calendar size={20} /> },
    { label: 'Profile', path: '/doctor/profile', icon: <User size={20} /> },
  ];

  const userMenuItems = [
    { label: 'Dashboard', path: '/user/dashboard', icon: <Home size={20} /> },
    { label: 'New Case', path: '/user/submit', icon: <TestTube size={20} /> },
    { label: 'My Cases', path: '/user/cases', icon: <FileText size={20} /> },
    { label: 'Doctors', path: '/user/doctors', icon: <Stethoscope size={20} /> },
    { label: 'Profile', path: '/user/profile', icon: <User size={20} /> },
  ];

  return (
    <Router>
      <Toaster position="top-right" />
      
      {isLoggedIn && user.role === 'admin' && <Sidebar sidebarItems={adminMenuItems} userRole="admin" />}
      {isLoggedIn && user.role === 'doctor' && <Sidebar sidebarItems={doctorMenuItems} userRole="doctor" />}
      {isLoggedIn && user.role === 'user' && <Sidebar sidebarItems={userMenuItems} userRole="user" />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/doctors" 
          element={
            <ProtectedRoute requiredRole="admin">
              <DoctorManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute requiredRole="admin">
              <UserManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/diseases" 
          element={
            <ProtectedRoute requiredRole="admin">
              <DiseaseManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/location" 
          element={
            <ProtectedRoute requiredRole="admin">
              <LocationMonitoring />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/notifications" 
          element={
            <ProtectedRoute requiredRole="admin">
              <Notifications />
            </ProtectedRoute>
          } 
        />

        {/* Doctor Routes */}
        <Route 
          path="/doctor/dashboard" 
          element={
            <ProtectedRoute requiredRole="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/doctor/mycases" 
          element={
            <ProtectedRoute requiredRole="doctor">
              <DoctorMyCases />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/doctor/appointments" 
          element={
            <ProtectedRoute requiredRole="doctor">
              <DoctorAppointments />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/doctor/profile" 
          element={
            <ProtectedRoute requiredRole="doctor">
              <DoctorProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/doctor/cases" 
          element={
            <ProtectedRoute requiredRole="doctor">
              <CaseRequests />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/doctor/history" 
          element={
            <ProtectedRoute requiredRole="doctor">
              <CaseHistory />
            </ProtectedRoute>
          } 
        />

        {/* User Routes */}
        <Route 
          path="/user/dashboard" 
          element={
            <ProtectedRoute requiredRole="user">
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/submit" 
          element={
            <ProtectedRoute requiredRole="user">
              <SubmitCase />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/cases" 
          element={
            <ProtectedRoute requiredRole="user">
              <MyCases />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/doctors" 
          element={
            <ProtectedRoute requiredRole="user">
              <NearbyDoctors />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/profile" 
          element={
            <ProtectedRoute requiredRole="user">
              <Profile />
            </ProtectedRoute>
          } 
        />

        {/* Fallback */}
        <Route path="/" element={<Navigate to={user.role ? `/${user.role}/dashboard` : '/login'} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
