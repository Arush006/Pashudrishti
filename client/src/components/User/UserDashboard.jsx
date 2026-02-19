import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Topbar from '../Shared/Topbar';
import { Heart, Activity, FileText, Users, Plus, Stethoscope, FileUp } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, percentage, color, delay }) => {
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
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all"
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

      <p className="text-gray-600 text-sm mb-2">{label}</p>
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.1 }}
        className="text-4xl font-bold text-gray-900"
      >
        {displayValue}
      </motion.h3>
    </motion.div>
  );
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

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
    <div className="min-h-screen bg-gray-50 pt-24">
      <Topbar title="My Dashboard" />

      <div className="md:ml-64 p-4 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, {user.name?.split(' ')[0]}! 👋</h1>
          <p className="text-gray-600">Track your animal health and connect with expert veterinarians</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Heart}
            label="My Pets"
            value={stats.myPets}
            percentage={12}
            color="bg-pink-500"
            delay={0}
          />
          <StatCard
            icon={FileText}
            label="Pending Cases"
            value={stats.pendingCases}
            percentage={-5}
            color="bg-yellow-500"
            delay={0.1}
          />
          <StatCard
            icon={Activity}
            label="Consultations"
            value={stats.consultations}
            percentage={8}
            color="bg-blue-500"
            delay={0.2}
          />
          <StatCard
            icon={Users}
            label="Nearby Doctors"
            value={stats.nearbyDoctors}
            percentage={15}
            color="bg-purple-500"
            delay={0.3}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Cases Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <FileText className="text-blue-600" size={28} />
                <span>My Cases</span>
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Case ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Pet</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Doctor</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Update</th>
                  </tr>
                </thead>
                <tbody>
                  {myCases.map((caseItem, index) => (
                    <motion.tr
                      key={caseItem.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="border-b border-gray-200 hover:bg-gray-50 transition cursor-pointer"
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-blue-600">{caseItem.caseId}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">{caseItem.pet.name}</div>
                        <div className="text-xs text-gray-600">{caseItem.pet.breed}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{caseItem.doctor}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(caseItem.status)}`}>
                          {caseItem.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{caseItem.lastUpdate}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate('/user/my-cases')}
              className="w-full px-4 py-3 text-blue-600 font-semibold hover:bg-gray-50 transition border-t border-gray-200"
            >
              View All Cases →
            </motion.button>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>

            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/user/submit')}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center space-x-2"
              >
                <Plus size={20} />
                <span>Submit New Case</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/user/find-doctors')}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center space-x-2"
              >
                <Stethoscope size={20} />
                <span>Find Doctors</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center space-x-2"
              >
                <FileUp size={20} />
                <span>Upload Report</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/user/profile')}
                className="w-full px-4 py-3 border-2 border-blue-300 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                View Profile
              </motion.button>
            </div>

            {/* Info Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <p className="text-sm font-semibold text-blue-900 mb-2">💡 Pro Tip</p>
              <p className="text-xs text-blue-700">
                Upload pet health records to help doctors provide better consultation
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
