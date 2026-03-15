import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { adminService } from '../../services/authService';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle, Eye } from 'lucide-react';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await adminService.getDoctors();
      setDoctors(response.data);
    } catch (error) {
      toast.error('Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (doctorId) => {
    try {
      await adminService.approveDoctor(doctorId);
      toast.success('Doctor approved successfully');
      fetchDoctors();
    } catch (error) {
      toast.error('Failed to approve doctor');
    }
  };

  const handleSuspend = async (doctorId) => {
    try {
      await adminService.suspendDoctor(doctorId);
      toast.success('Doctor suspended successfully');
      fetchDoctors();
    } catch (error) {
      toast.error('Failed to suspend doctor');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin h-12 w-12 border-b-2 border-primary"></div></div>;

  return (
    <div className="flex-1 md:ml-64 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-4xl font-bold text-gray-900">Doctor Management</h1>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-primary to-dark-blue text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Specialization</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {doctors.map((doctor) => (
                  <motion.tr
                    key={doctor.id}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                    className="transition"
                  >
                    <td className="px-6 py-4 font-semibold">{doctor.name}</td>
                    <td className="px-6 py-4">{doctor.email}</td>
                    <td className="px-6 py-4">{doctor.specialization || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          doctor.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : doctor.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2 flex">
                      {doctor.status !== 'approved' && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => handleApprove(doctor.id)}
                          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                          <CheckCircle size={18} />
                        </motion.button>
                      )}
                      {doctor.status !== 'suspended' && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => handleSuspend(doctor.id)}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          <XCircle size={18} />
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        <Eye size={18} />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DoctorManagement;
