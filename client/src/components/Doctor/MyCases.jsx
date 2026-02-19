import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Topbar from '../Shared/Topbar';
import { FileText, Clock, CheckCircle, AlertCircle, Search } from 'lucide-react';

const MyCases = () => {
  const [cases] = useState([
    {
      id: 1,
      caseId: 'CASE-001',
      patient: 'Farmer Singh',
      animal: 'Cow',
      disease: 'Foot and Mouth Disease',
      status: 'in-progress',
      date: '2024-01-15',
      severity: 'high',
    },
    {
      id: 2,
      caseId: 'CASE-002',
      patient: 'Rajesh Patel',
      animal: 'Buffalo',
      disease: 'Mastitis',
      status: 'pending',
      date: '2024-01-18',
      severity: 'medium',
    },
    {
      id: 3,
      caseId: 'CASE-003',
      patient: 'Priya Sharma',
      animal: 'Goat',
      disease: 'Pneumonia',
      status: 'resolved',
      date: '2024-01-10',
      severity: 'high',
    },
    {
      id: 4,
      caseId: 'CASE-004',
      patient: 'Amit Kumar',
      animal: 'Chicken',
      disease: 'Coccidiosis',
      status: 'in-progress',
      date: '2024-01-16',
      severity: 'low',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status) => {
    const badges = {
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      'in-progress': { bg: 'bg-blue-100', text: 'text-blue-800', icon: AlertCircle },
      'resolved': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
    };
    const badge = badges[status];
    const Icon = badge.icon;
    return (
      <span className={`${badge.bg} ${badge.text} px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 w-fit`}>
        <Icon size={16} />
        <span className="capitalize">{status.replace('-', ' ')}</span>
      </span>
    );
  };

  const getSeverityColor = (severity) => {
    const colors = {
      'low': 'text-green-600',
      'medium': 'text-yellow-600',
      'high': 'text-red-600',
    };
    return colors[severity];
  };

  const filteredCases = cases.filter(
    (c) =>
      c.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <Topbar title="My Cases" />

      <div className="md:ml-64 p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Cases</h1>
          <p className="text-gray-600">Manage and track all your assigned cases</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by patient name or case ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>
        </motion.div>

        {/* Cases Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Case ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Patient</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Animal</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Disease</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Severity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((caseItem, index) => (
                  <motion.tr
                    key={caseItem.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">{caseItem.caseId}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{caseItem.patient}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{caseItem.animal}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{caseItem.disease}</td>
                    <td className="px-6 py-4">{getStatusBadge(caseItem.status)}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-semibold capitalize ${getSeverityColor(caseItem.severity)}`}>
                        {caseItem.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{caseItem.date}</td>
                    <td className="px-6 py-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                      >
                        View
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCases.length === 0 && (
            <div className="p-8 text-center">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No cases found matching your search.</p>
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
            className="bg-white rounded-xl p-6 shadow-md"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="text-blue-600" size={28} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Cases</p>
                <p className="text-2xl font-bold text-gray-900">{cases.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl p-6 shadow-md"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="text-yellow-600" size={28} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{cases.filter(c => c.status === 'in-progress').length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl p-6 shadow-md"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={28} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">{cases.filter(c => c.status === 'resolved').length}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyCases;
