import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Topbar = ({ title = 'Dashboard' }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications] = useState(3);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const handleProfile = () => {
    navigate(`/${user.role}/profile`);
    setShowDropdown(false);
  };

  const handleSettings = () => {
    toast.info('Settings coming soon!');
    setShowDropdown(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg z-30 flex items-center justify-between px-8"
    >
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      <div className="flex items-center space-x-6">
        {/* Notification Bell */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 hover:bg-blue-500 rounded-full transition"
        >
          <Bell size={24} />
          {notifications > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
            >
              {notifications}
            </motion.span>
          )}
        </motion.button>

        {/* Profile Section */}
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold text-lg cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {user.name?.charAt(0).toUpperCase() || 'D'}
          </motion.div>

          <div className="hidden sm:block">
            <p className="font-semibold text-sm">{user.name || 'Doctor'}</p>
            <p className="text-blue-200 text-xs capitalize">{user.role}</p>
          </div>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-24 right-8 bg-white text-gray-900 rounded-lg shadow-xl w-48 overflow-hidden"
              >
                <motion.button
                  whileHover={{ backgroundColor: '#f0f9ff' }}
                  onClick={handleProfile}
                  className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-blue-50 transition"
                >
                  <User size={18} />
                  <span>View Profile</span>
                </motion.button>

                <motion.button
                  whileHover={{ backgroundColor: '#f0f9ff' }}
                  onClick={handleSettings}
                  className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-blue-50 transition"
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </motion.button>

                <div className="border-t border-gray-200" />

                <motion.button
                  whileHover={{ backgroundColor: '#fef2f2' }}
                  onClick={handleLogout}
                  className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-red-50 transition text-red-600"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Overlay to close dropdown */}
      {showDropdown && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowDropdown(false)}
          className="fixed inset-0 z-20"
        />
      )}
    </motion.div>
  );
};

export default Topbar;
