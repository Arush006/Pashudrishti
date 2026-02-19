import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Topbar from '../Shared/Topbar';
import { Calendar, Clock, MapPin, User, Phone, Check, X } from 'lucide-react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      farmerId: 'FARM-001',
      farmerName: 'Farmer Singh',
      date: '2024-02-20',
      time: '10:00 AM',
      animal: 'Cow',
      location: '123 Village Road, Districts',
      contact: '9876543210',
      status: 'scheduled',
    },
    {
      id: 2,
      farmerId: 'FARM-002',
      farmerName: 'Rajesh Patel',
      date: '2024-02-20',
      time: '2:00 PM',
      animal: 'Buffalo',
      location: '456 Farm Lane, Districts',
      contact: '9876543211',
      status: 'scheduled',
    },
    {
      id: 3,
      farmerId: 'FARM-003',
      farmerName: 'Priya Sharma',
      date: '2024-02-21',
      time: '11:00 AM',
      animal: 'Goat',
      location: '789 Green Field, Districts',
      contact: '9876543212',
      status: 'completed',
    },
  ]);

  const handleApprove = (id) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: 'completed' } : apt
      )
    );
  };

  const handleCancel = (id) => {
    setAppointments(appointments.filter((apt) => apt.id !== id));
  };

  const upcomingAppointments = appointments.filter((apt) => apt.status === 'scheduled');
  const completedAppointments = appointments.filter((apt) => apt.status === 'completed');

  const AppointmentCard = ({ appointment, onApprove, onCancel }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-600 text-sm mb-1">Farmer Name</p>
          <p className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <User size={18} className="text-blue-600" />
            <span>{appointment.farmerName}</span>
          </p>
        </div>
        <div>
          <p className="text-gray-600 text-sm mb-1">Animal Type</p>
          <p className="text-lg font-semibold text-gray-900">{appointment.animal}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-600 text-sm mb-1">Date & Time</p>
          <div className="flex items-center space-x-2 text-gray-900">
            <Calendar size={18} className="text-green-600" />
            <span className="font-semibold">{appointment.date}</span>
            <Clock size={18} className="text-purple-600 ml-2" />
            <span className="font-semibold">{appointment.time}</span>
          </div>
        </div>

        <div>
          <p className="text-gray-600 text-sm mb-1">Contact</p>
          <div className="flex items-center space-x-2 text-gray-900">
            <Phone size={18} className="text-orange-600" />
            <span className="font-semibold">{appointment.contact}</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-600 text-sm mb-1">Location</p>
        <div className="flex items-start space-x-2 text-gray-900">
          <MapPin size={18} className="text-red-600 mt-0.5" />
          <span className="font-semibold">{appointment.location}</span>
        </div>
      </div>

      {onApprove && onCancel && (
        <div className="flex space-x-3 pt-4 border-t border-gray-200">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onApprove(appointment.id)}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center space-x-2"
          >
            <Check size={18} />
            <span>Mark Complete</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCancel(appointment.id)}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center space-x-2"
          >
            <X size={18} />
            <span>Cancel</span>
          </motion.button>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <Topbar title="Appointments" />

      <div className="md:ml-64 p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Appointments</h1>
          <p className="text-gray-600">Schedule your visits with farmers</p>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <Calendar className="text-blue-600" size={28} />
            <span>Upcoming Appointments</span>
          </h2>

          {upcomingAppointments.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingAppointments.map((apt) => (
                <AppointmentCard
                  key={apt.id}
                  appointment={apt}
                  onApprove={handleApprove}
                  onCancel={handleCancel}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl p-8 text-center shadow-md"
            >
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No upcoming appointments</p>
            </motion.div>
          )}
        </motion.div>

        {/* Completed Appointments */}
        {completedAppointments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Check className="text-green-600" size={28} />
              <span>Completed Appointments</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {completedAppointments.map((apt) => (
                <AppointmentCard key={apt.id} appointment={apt} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
