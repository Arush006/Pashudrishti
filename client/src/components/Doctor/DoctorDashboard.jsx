import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { doctorService } from '../../services/authService';
import toast from 'react-hot-toast';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

const DoctorDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await doctorService.getDashboard();
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Doctor Dashboard</h1>
          <p className="text-gray-600">Monitor your case status and performance metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={AlertCircle}
            label="Assigned Cases"
            value={dashboard?.assignedCases || 0}
            color="from-blue-500 to-blue-600"
          />
          <StatCard
            icon={Clock}
            label="Pending Cases"
            value={dashboard?.pendingCases || 0}
            color="from-yellow-500 to-yellow-600"
          />
          <StatCard
            icon={CheckCircle}
            label="Resolved Cases"
            value={dashboard?.resolvedCases || 0}
            color="from-green-500 to-green-600"
          />
          <StatCard
            icon={AlertCircle}
            label="Cure Rate"
            value={`${dashboard?.cureRate || 0}%`}
            color="from-purple-500 to-purple-600"
          />
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboard?.monthlyPerformance || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#2563eb"
                name="Resolved Cases"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DoctorDashboard;
