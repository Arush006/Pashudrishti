import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const Topbar = ({ title = 'Dashboard' }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications] = useState(3);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { t } = useLanguage();
  const { isDark } = useTheme();

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
    navigate(`/${user.role}/settings`);
    setShowDropdown(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`h-20 ${isDark ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-blue-600 to-blue-800'} ${isDark ? 'text-white' : 'text-white'} shadow-lg flex items-center justify-between px-8 flex-shrink-0 transition-colors duration-300`}
    >
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">Pashudrishti</h1>
      </div>

      <div className="flex items-center space-x-6">
        {/* Notification Bell */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 hover:bg-opacity-20 hover:bg-white rounded-full transition"
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
            className={`w-10 h-10 ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-blue-600'} rounded-full flex items-center justify-center font-bold text-lg cursor-pointer`}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {user.name?.charAt(0).toUpperCase() || 'D'}
          </motion.div>

          <div className="hidden sm:block">
            <p className="font-semibold text-sm">{user.name || 'Doctor'}</p>
            <p className={isDark ? 'text-gray-400 text-xs capitalize' : 'text-blue-200 text-xs capitalize'}>{user.role}</p>
          </div>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`absolute top-24 right-8 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-xl w-48 overflow-hidden`}
              >
                <motion.button
                  whileHover={{ backgroundColor: isDark ? '#374151' : '#f0f9ff' }}
                  onClick={handleProfile}
                  className={`w-full px-4 py-4 flex items-center space-x-3 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} transition text-lg`}
                >
                  <User size={20} />
                  <span className="font-semibold">{t('profile')}</span>
                </motion.button>

                <motion.button
                  whileHover={{ backgroundColor: isDark ? '#374151' : '#f0f9ff' }}
                  onClick={handleSettings}
                  className={`w-full px-4 py-4 flex items-center space-x-3 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} transition text-lg`}
                >
                  <Settings size={20} />
                  <span className="font-semibold">{t('settings')}</span>
                </motion.button>

                <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />

                <motion.button
                  whileHover={{ backgroundColor: isDark ? '#7f1d1d' : '#fef2f2' }}
                  onClick={handleLogout}
                  className={`w-full px-4 py-4 flex items-center space-x-3 ${isDark ? 'hover:bg-red-900' : 'hover:bg-red-50'} transition text-lg font-semibold ${isDark ? '' : 'text-red-600'}`}
                >
                  <LogOut size={20} />
                  <span>{t('logout')}</span>
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
