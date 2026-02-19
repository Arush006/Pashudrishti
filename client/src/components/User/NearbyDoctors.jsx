import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { userService } from '../../services/authService';
import toast from 'react-hot-toast';
import { Star, Phone, MapPin } from 'lucide-react';

const NearbyDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNearbyDoctors();
  }, []);

  const fetchNearbyDoctors = async () => {
    try {
      const response = await userService.getNearbyDoctors();
      setDoctors(response.data);
    } catch (error) {
      toast.error('Failed to fetch doctors');
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
        className="space-y-6"
      >
        <h1 className="text-4xl font-bold text-gray-900">Nearby Veterinarians</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-6 shadow-lg space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.specialization}</p>
                </div>
                <div className="flex items-center space-x-1 bg-yellow-100 px-3 py-1 rounded-full">
                  <Star size={16} className="text-yellow-500" />
                  <span className="font-semibold text-yellow-800">{doctor.rating || 'N/A'}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex items-center space-x-2 text-gray-700">
                  <Phone size={18} className="text-primary" />
                  <span>{doctor.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <MapPin size={18} className="text-primary" />
                  <span>{doctor.cases_handled} cases handled</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full px-4 py-3 bg-gradient-to-r from-primary to-dark-blue text-white rounded-lg hover:shadow-lg transition"
              >
                Contact Doctor
              </motion.button>
            </motion.div>
          ))}
        </div>

        {doctors.length === 0 && (
          <motion.div
            className="text-center py-12 bg-white rounded-2xl shadow-lg"
          >
            <p className="text-gray-600 text-lg">No doctors available yet</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default NearbyDoctors;
