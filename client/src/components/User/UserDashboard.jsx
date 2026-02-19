import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { userService } from '../../services/authService';
import toast from 'react-hot-toast';
import { Heart, Activity, Briefcase, Users } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white shadow-lg`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-90">{label}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
      <Icon size={40} className="opacity-80" />
    </div>
  </motion.div>
);

const UserDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await userService.getDashboard();
      setDashboard(response.data);
    } catch (error) {
      toast.error('Failed to fetch dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin h-12 w-12 border-b-2 border-primary"></div></div>;

  return (
    <div className="flex-1 md:ml-64 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Track your animal health cases and consult with experts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Briefcase}
            label="Total Cases"
            value={dashboard?.totalCases || 0}
            color="from-blue-500 to-blue-600"
          />
          <StatCard
            icon={Activity}
            label="Pending Cases"
            value={dashboard?.pendingCases || 0}
            color="from-yellow-500 to-yellow-600"
          />
          <StatCard
            icon={Heart}
            label="Resolved Cases"
            value={dashboard?.resolvedCases || 0}
            color="from-green-500 to-green-600"
          />
          <StatCard
            icon={Users}
            label="Available Doctors"
            value={dashboard?.nearbyDoctors?.length || 0}
            color="from-purple-500 to-purple-600"
          />
        </div>

        {/* Available Doctors */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Available Veterinarians</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(dashboard?.nearbyDoctors || []).map((doctor) => (
              <motion.div
                key={doctor.id}
                whileHover={{ scale: 1.05 }}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition"
              >
                <h4 className="font-bold text-gray-900">{doctor.name}</h4>
                <p className="text-sm text-gray-600">{doctor.specialization}</p>
                <p className="text-sm text-gray-500 mt-2">📞 {doctor.phone}</p>
                <div className="flex items-center mt-3 space-x-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-semibold">{doctor.rating || 'N/A'}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-primary to-dark-blue rounded-2xl p-8 text-white shadow-lg cursor-pointer"
          >
            <h3 className="text-2xl font-bold mb-2">Submit New Case</h3>
            <p className="text-blue-100">Upload animal photo and describe symptoms</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-lg cursor-pointer"
          >
            <h3 className="text-2xl font-bold mb-2">View My Cases</h3>
            <p className="text-green-100">Check status of all your submitted cases</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
