import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Topbar from '../Shared/Topbar';
import { Users, Activity, Calendar, FileText, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';

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
          <TrendingUp size={16} />
          <span>{percentage >= 0 ? '+' : ''}{percentage}%</span>
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

const ActivityItem = ({ icon: Icon, title, subtitle, time, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ x: 5 }}
      className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition"
    >
      <div className={`p-3 rounded-full ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      <span className="text-xs text-gray-500 whitespace-nowrap">{time}</span>
    </motion.div>
  );
};

const DoctorDashboard = () => {
  const [stats] = useState({
    totalPatients: 156,
    activeCases: 12,
    appointments: 8,
    reports: 43,
  });

  const [activities] = useState([
    {
      id: 1,
      icon: CheckCircle,
      title: 'Case Completed',
      subtitle: 'Cow with skin infection - Resolved',
      time: '2 hours ago',
      color: 'bg-green-500',
    },
    {
      id: 2,
      icon: Users,
      title: 'New Patient',
      subtitle: 'Farmer Singh registered with animal case',
      time: '4 hours ago',
      color: 'bg-blue-500',
    },
    {
      id: 3,
      icon: Calendar,
      title: 'Appointment Reminder',
      subtitle: 'Visit scheduled for Buffalo examination',
      time: '6 hours ago',
      color: 'bg-purple-500',
    },
  ]);

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      // You can update stats here if needed
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <Topbar title="Doctor Dashboard" />

      {/* Main Content */}
      <div className="md:ml-64 p-4 md:p-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, Doctor!</h1>
          <p className="text-gray-600">Here's your performance summary for this week</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Total Patients"
            value={stats.totalPatients}
            percentage={12}
            color="bg-blue-500"
            delay={0}
          />
          <StatCard
            icon={AlertCircle}
            label="Active Cases"
            value={stats.activeCases}
            percentage={8}
            color="bg-orange-500"
            delay={0.1}
          />
          <StatCard
            icon={Calendar}
            label="Appointments"
            value={stats.appointments}
            percentage={-3}
            color="bg-purple-500"
            delay={0.2}
          />
          <StatCard
            icon={FileText}
            label="Reports Filed"
            value={stats.reports}
            percentage={15}
            color="bg-green-500"
            delay={0.3}
          />
        </div>

        {/* Recent Activities Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Activity size={24} className="text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Recent Activities</h2>
            </div>
            <p className="text-gray-600 text-sm">Your latest interactions and updates</p>
          </div>

          <div className="divide-y divide-gray-200">
            {activities.map((activity, index) => (
              <ActivityItem
                key={activity.id}
                icon={activity.icon}
                title={activity.title}
                subtitle={activity.subtitle}
                time={activity.time}
                color={activity.color}
                delay={0.5 + index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white rounded-xl p-6 text-center hover:bg-blue-700 transition-colors"
          >
            <Calendar size={32} className="mx-auto mb-3" />
            <p className="font-semibold">View Cases</p>
            <p className="text-sm text-blue-100">Manage your cases</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white rounded-xl p-6 text-center hover:bg-purple-700 transition-colors"
          >
            <Clock size={32} className="mx-auto mb-3" />
            <p className="font-semibold">Appointments</p>
            <p className="text-sm text-purple-100">Check your schedule</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white rounded-xl p-6 text-center hover:bg-green-700 transition-colors"
          >
            <FileText size={32} className="mx-auto mb-3" />
            <p className="font-semibold">Reports</p>
            <p className="text-sm text-green-100">File medical reports</p>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
