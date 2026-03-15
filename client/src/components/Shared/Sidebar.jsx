import React from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const Sidebar = ({ sidebarItems, userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Translation map for sidebar items
  const translateLabel = (label) => {
    const labelMap = {
      'Dashboard': 'dashboard',
      'New Case': 'newCase',
      'My Cases': 'myCases',
      'Doctors': 'doctors',
      'Profile': 'myProfile',
    };
    return t(labelMap[label] || label.toLowerCase());
  };

  return (
    <>
      {/* Sidebar - Always visible, fixed width */}
      <div className={`hidden md:flex md:fixed md:left-0 md:top-20 md:w-64 md:h-[calc(100vh-80px)] ${isDark ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-blue-600 to-blue-800'} text-white shadow-lg overflow-y-auto sidebar-scrollbar z-40 flex-col transition-colors duration-300`}>
        <div className={`p-8 ${isDark ? 'border-gray-700' : 'border-blue-500'} border-b flex-shrink-0`}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-3xl font-bold">Pashudrishti</h1>
          </motion.div>
        </div>

        <nav className="flex-1 px-4 space-y-2 py-6">
          {sidebarItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: 10 }}
              transition={{ delay: 0.2 + idx * 0.05, duration: 0.2 }}
            >
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? isDark ? 'bg-blue-600 text-white font-semibold' : 'bg-blue-400 text-white font-semibold'
                    : isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{translateLabel(item.label)}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mx-4 mb-6 flex items-center space-x-1 w-full px-3 py-2 rounded-lg transition-colors font-semibold flex-shrink-0 text-sm ${isDark ? 'bg-red-700 hover:bg-red-800' : 'bg-red-500 hover:bg-red-600'}`}
        >
          <LogOut size={16} />
          <span>{t('logout')}</span>
        </motion.button>
      </div>
    </>
  );
};

export default Sidebar;
