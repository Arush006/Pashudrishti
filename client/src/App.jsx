import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/Shared/ProtectedRoute';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

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
import DoctorReports from './components/Doctor/Reports';
import CaseRequests from './components/Doctor/CaseRequests';
import CaseHistory from './components/Doctor/CaseHistory';

// User
import UserDashboard from './components/User/UserDashboard';
import SubmitCase from './components/User/SubmitCase';
import MyCases from './components/User/MyCases';
import NearbyDoctors from './components/User/NearbyDoctors';
import Profile from './components/User/Profile';

// Settings
import Settings from './components/Settings/Settings';

const App = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <Toaster position="top-right" />

          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

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
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <Settings />
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
              path="/doctor/reports" 
              element={
                <ProtectedRoute requiredRole="doctor">
                  <DoctorReports />
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
            <Route 
              path="/doctor/settings" 
              element={
                <ProtectedRoute requiredRole="doctor">
                  <Settings />
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
            <Route 
              path="/user/settings" 
              element={
                <ProtectedRoute requiredRole="user">
                  <Settings />
                </ProtectedRoute>
              } 
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
