import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Globe, Moon, Sun, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const Settings = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const handleBackToProfile = () => {
    navigate(`/${user.role}/profile`);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-4 md:p-8 transition-colors duration-300`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button
          onClick={handleBackToProfile}
          className={`mb-6 px-4 py-2 rounded-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} transition`}
        >
          ← Back
        </button>
        
        <div className="flex items-center space-x-3 mb-2">
          <SettingsIcon size={32} className={isDark ? 'text-white' : 'text-gray-900'} />
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('settings')}
          </h1>
        </div>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
          {t('preferences')} - {user.name || 'User'}
        </p>
      </motion.div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {/* Language Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md p-6`}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Globe size={28} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('language')}
            </h2>
          </div>

          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('selectLanguage')}
          </p>

          <div className="space-y-3">
            {/* English Option */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setLanguage('en');
                toast.success('Language changed to English');
              }}
              className={`w-full p-4 rounded-xl font-semibold transition flex items-center justify-between ${
                language === 'en'
                  ? isDark
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white'
                  : isDark
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              <span>{t('english')}</span>
              {language === 'en' && <span className="text-lg">✓</span>}
            </motion.button>

            {/* Hindi Option */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setLanguage('hi');
                toast.success('भाषा हिंदी में बदल गई');
              }}
              className={`w-full p-4 rounded-xl font-semibold transition flex items-center justify-between ${
                language === 'hi'
                  ? isDark
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white'
                  : isDark
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              <span>{t('hindi')}</span>
              {language === 'hi' && <span className="text-lg">✓</span>}
            </motion.button>
          </div>
        </motion.div>

        {/* Theme Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md p-6`}
        >
          <div className="flex items-center space-x-3 mb-4">
            {isDark ? (
              <Moon size={28} className="text-yellow-400" />
            ) : (
              <Sun size={28} className="text-yellow-600" />
            )}
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('theme')}
            </h2>
          </div>

          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('selectTheme')}
          </p>

          <div className="space-y-3">
            {/* Light Mode */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (isDark) toggleTheme();
                toast.success('Light mode enabled');
              }}
              className={`w-full p-4 rounded-xl font-semibold transition flex items-center justify-between ${
                !isDark
                  ? 'bg-blue-600 text-white'
                  : isDark
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Sun size={20} />
                <span>{t('lightMode')}</span>
              </div>
              {!isDark && <span className="text-lg">✓</span>}
            </motion.button>

            {/* Dark Mode */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (!isDark) toggleTheme();
                toast.success('Dark mode enabled');
              }}
              className={`w-full p-4 rounded-xl font-semibold transition flex items-center justify-between ${
                isDark
                  ? 'bg-blue-600 text-white'
                  : isDark
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Moon size={20} />
                <span>{t('darkMode')}</span>
              </div>
              {isDark && <span className="text-lg">✓</span>}
            </motion.button>
          </div>
        </motion.div>

        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md p-6`}
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              {user.name?.charAt(0).toUpperCase() || 'D'}
            </div>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('profile')}
            </h2>
          </div>

          <div className={`mb-6 p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Email</p>
            <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {user.email || 'user@example.com'}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBackToProfile}
            className={`w-full p-3 rounded-xl font-semibold transition ${
              isDark
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            }`}
          >
            {t('myProfile')} →
          </motion.button>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md p-6 flex flex-col justify-between`}
        >
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <LogOut size={28} className="text-red-600" />
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('logout')}
              </h2>
            </div>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Sign out from your account
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full mt-6 p-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition flex items-center justify-center space-x-2"
          >
            <LogOut size={20} />
            <span>{t('logout')}</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
