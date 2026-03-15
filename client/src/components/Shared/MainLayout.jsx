import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { LayoutDashboard, Users, TestTube, MapPin, Bell, Stethoscope, Calendar, FileText, Home, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const MainLayout = ({ children, userRole }) => {
  const { isDark } = useTheme();
  
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
    { label: 'Reports', path: '/doctor/reports', icon: <FileText size={20} /> },
    { label: 'Profile', path: '/doctor/profile', icon: <User size={20} /> },
  ];

  const userMenuItems = [
    { label: 'Dashboard', path: '/user/dashboard', icon: <Home size={20} /> },
    { label: 'New Case', path: '/user/submit', icon: <TestTube size={20} /> },
    { label: 'My Cases', path: '/user/cases', icon: <FileText size={20} /> },
    { label: 'Doctors', path: '/user/doctors', icon: <Stethoscope size={20} /> },
    { label: 'Profile', path: '/user/profile', icon: <User size={20} /> },
  ];

  const getMenuItems = () => {
    switch (userRole) {
      case 'admin':
        return adminMenuItems;
      case 'doctor':
        return doctorMenuItems;
      case 'user':
        return userMenuItems;
      default:
        return [];
    }
  };

  return (
    <div className={`flex flex-col h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Topbar */}
      <Topbar />
      
      {/* Main content with sidebar */}
      <div className="flex flex-1 overflow-hidden md:ml-64">
        {/* Sidebar */}
        <Sidebar sidebarItems={getMenuItems()} userRole={userRole} />
        
        {/* Content area - Fills remaining space */}
        <div className={`flex-1 overflow-auto ${isDark ? 'bg-gray-900' : 'bg-gray-50'} w-full transition-colors duration-300`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
