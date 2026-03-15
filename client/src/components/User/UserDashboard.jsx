import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Activity, FileText, Users, Plus, Stethoscope, FileUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const StatCard = ({ icon: Icon, label, value, percentage, color, delay, isDark }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-md hover:shadow-xl transition-all`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={28} className="text-white" />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
          className={`text-sm font-semibold flex items-center space-x-1 ${
            percentage >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          <span>{percentage >= 0 ? '↑' : '↓'} {Math.abs(percentage)}%</span>
        </motion.div>
      </div>

      <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.1 }}
        className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
      >
        {displayValue}
      </motion.h3>
    </motion.div>
  );
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const [myCases] = useState([
    {
      id: 1,
      caseId: 'CASE-001',
      pet: { name: 'Bessie', breed: 'Holstein Cow' },
      doctor: 'Dr. Rajesh Kumar',
      status: 'active',
      lastUpdate: '2024-02-18',
    },
    {
      id: 2,
      caseId: 'CASE-002',
      pet: { name: 'Mohan', breed: 'Buffalo' },
      doctor: 'Dr. Priya Singh',
      status: 'pending',
      lastUpdate: '2024-02-15',
    },
    {
      id: 3,
      caseId: 'CASE-003',
      pet: { name: 'Shaun', breed: 'Goat' },
      doctor: 'Dr. Rajesh Kumar',
      status: 'resolved',
      lastUpdate: '2024-02-10',
    },
  ]);

  const stats = {
    myPets: 5,
    pendingCases: 2,
    consultations: 8,
    nearbyDoctors: 12,
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-gray-100 text-gray-800',
    };
    return badges[status];
  };

  return (
    <div className={`p-4 md:p-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen transition-colors duration-300`}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('welcome')}, {user.name?.split(' ')[0]}! 👋
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Track your animal health and connect with expert veterinarians</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Heart}
            label={t('myPets')}
            value={stats.myPets}
            percentage={12}
            color="bg-pink-500"
            delay={0}
            isDark={isDark}
          />
          <StatCard
            icon={FileText}
            label={t('pendingCases')}
            value={stats.pendingCases}
            percentage={-5}
            color="bg-yellow-500"
            delay={0.1}
            isDark={isDark}
          />
          <StatCard
            icon={Activity}
            label={t('consultations')}
            value={stats.consultations}
            percentage={8}
            color="bg-blue-500"
            delay={0.2}
            isDark={isDark}
          />
          <StatCard
            icon={Users}
            label={t('nearbyDoctors')}
            value={stats.nearbyDoctors}
            percentage={15}
            color="bg-purple-500"
            delay={0.3}
            isDark={isDark}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Cases Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`lg:col-span-2 rounded-2xl shadow-md overflow-hidden transition-colors ${isDark ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className={`p-6 border-b transition-colors ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className={`text-2xl font-bold flex items-center space-x-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <FileText className="text-blue-600" size={28} />
                <span>{t('myCases')}</span>
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className={`w-full transition-colors ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <thead className={`border-b transition-colors ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <tr>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{t('caseId')}</th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{t('pet')}</th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{t('doctor')}</th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{t('status')}</th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{t('lastUpdate')}</th>
                  </tr>
                </thead>
                <tbody>
                  {myCases.map((caseItem, index) => (
                    <motion.tr
                      key={caseItem.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className={`border-b transition-colors cursor-pointer ${isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-blue-600">{caseItem.caseId}</td>
                      <td className="px-6 py-4">
                        <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{caseItem.pet.name}</div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{caseItem.pet.breed}</div>
                      </td>
                      <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{caseItem.doctor}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(caseItem.status)}`}>
                          {caseItem.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{caseItem.lastUpdate}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate('/user/my-cases')}
              className={`w-full px-4 py-3 text-blue-600 font-semibold transition border-t ${isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              {t('viewAllCases')} →
            </motion.button>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`rounded-2xl shadow-md p-6 transition-colors ${isDark ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('quickActions')}</h2>

            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/user/submit')}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center space-x-2"
              >
                <Plus size={20} />
                <span>{t('submitCase')}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/user/doctors')}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center space-x-2"
              >
                <Stethoscope size={20} />
                <span>{t('findNearbyDoctors')}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toast.info('Report upload feature coming soon!')}
                className={`w-full px-4 py-3 border-2 rounded-lg font-semibold transition flex items-center justify-center space-x-2 ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-900 hover:bg-gray-50'}`}
              >
                <FileUp size={20} />
                <span>{t('uploadReport')}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/user/profile')}
                className={`w-full px-4 py-3 border-2 rounded-lg font-semibold transition ${isDark ? 'border-blue-500 text-blue-400 hover:bg-gray-700' : 'border-blue-300 text-blue-600 hover:bg-blue-50'}`}
              >
                {t('profile')}
              </motion.button>
            </div>

            {/* Info Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`mt-8 p-4 rounded-lg border transition-colors ${isDark ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'}`}
            >
              <p className={`text-sm font-semibold mb-2 ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>{t('proTip')}</p>
              <p className={`text-xs ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                {t('uploadPetHealthRecordsHelp')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
  );
};

export default UserDashboard;
