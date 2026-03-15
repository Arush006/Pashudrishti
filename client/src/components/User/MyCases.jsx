import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Filter } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const MyCases = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [cases] = useState([
    {
      id: 1,
      caseId: 'CASE-001',
      pet: { name: 'Bessie', breed: 'Holstein Cow' },
      doctor: 'Dr. Rajesh Kumar',
      disease: 'Foot and Mouth Disease',
      status: 'active',
      lastUpdate: '2024-02-18',
      createdDate: '2024-01-15',
    },
    {
      id: 2,
      caseId: 'CASE-002',
      pet: { name: 'Mohan', breed: 'Buffalo' },
      doctor: 'Dr. Priya Singh',
      disease: 'Mastitis',
      status: 'pending',
      lastUpdate: '2024-02-15',
      createdDate: '2024-02-15',
    },
    {
      id: 3,
      caseId: 'CASE-003',
      pet: { name: 'Shaun', breed: 'Goat' },
      doctor: 'Dr. Rajesh Kumar',
      disease: 'Pneumonia',
      status: 'resolved',
      lastUpdate: '2024-02-10',
      createdDate: '2024-01-10',
    },
    {
      id: 4,
      caseId: 'CASE-004',
      pet: { name: 'Chickens', breed: 'Broilers' },
      doctor: 'Dr. Amit Patel',
      disease: 'Coccidiosis',
      status: 'active',
      lastUpdate: '2024-02-16',
      createdDate: '2024-02-01',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusBadge = (status) => {
    const badges = {
      active: isDark ? 'bg-green-900/40 text-green-300' : 'bg-green-100 text-green-800',
      pending: isDark ? 'bg-yellow-900/40 text-yellow-300' : 'bg-yellow-100 text-yellow-800',
      resolved: isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800',
    };
    return badges[status];
  };

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.disease.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`p-4 md:p-8 transition-colors ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('myCases')}</h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('trackAllAnimalCases')}</p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <div className="relative">
            <Search className={`absolute left-4 top-3.5 size-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder={t('searchByPetNameOrDisease')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition border ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </div>

          <div className="relative">
            <Filter className={`absolute left-4 top-3.5 size-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            >
              <option value="all">{t('allCases')}</option>
              <option value="active">{t('activeCases')}</option>
              <option value="pending">{t('pendingCasesText')}</option>
              <option value="resolved">{t('resolvedCases')}</option>
            </select>
          </div>
        </motion.div>

        {/* Cases Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-2xl shadow-md overflow-hidden transition-colors ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="overflow-x-auto">
            <table className={`w-full transition-colors ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <thead className={`border-b transition-colors ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <tr>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{t('caseId')}</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{t('pet')}</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{t('disease')}</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{t('doctor')}</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{t('status')}</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{t('created')}</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{t('lastUpdate')}</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{t('action')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((caseItem, index) => (
                  <motion.tr
                    key={caseItem.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className={`border-b transition-colors cursor-pointer ${isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">{caseItem.caseId}</td>
                    <td className="px-6 py-4">
                      <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{caseItem.pet.name}</div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{caseItem.pet.breed}</div>
                    </td>
                    <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{caseItem.disease}</td>
                    <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{caseItem.doctor}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(caseItem.status)}`}>
                        {caseItem.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{caseItem.createdDate}</td>
                    <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{caseItem.lastUpdate}</td>
                    <td className="px-6 py-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                      >
                        {t('view')}
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCases.length === 0 && (
            <div className="p-8 text-center">
              <FileText size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('noCasesFound')}</p>
            </div>
          )}
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`rounded-xl p-6 shadow-md transition-colors ${isDark ? 'bg-gray-800' : 'bg-white'}`}
          >
            <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('totalCases')}</p>
            <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{cases.length}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`rounded-xl p-6 shadow-md transition-colors ${isDark ? 'bg-gray-800' : 'bg-white'}`}
          >
            <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('activeCasesCount')}</p>
            <p className="text-3xl font-bold text-green-600">{cases.filter(c => c.status === 'active').length}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`rounded-xl p-6 shadow-md transition-colors ${isDark ? 'bg-gray-800' : 'bg-white'}`}
          >
            <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('resolvedCasesCount')}</p>
            <p className="text-3xl font-bold text-blue-600">{cases.filter(c => c.status === 'resolved').length}</p>
          </motion.div>
        </motion.div>
      </div>
  );
};

export default MyCases;
