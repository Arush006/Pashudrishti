import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { userService } from '../../services/authService';
import toast from 'react-hot-toast';
import { Search, Eye } from 'lucide-react';

const MyCases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(() => {
    fetchMyCases();
  }, []);

  const fetchMyCases = async () => {
    try {
      const response = await userService.getMyCases();
      setCases(response.data);
    } catch (error) {
      toast.error('Failed to fetch cases');
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
        <h1 className="text-4xl font-bold text-gray-900">My Cases</h1>

        {cases.length === 0 ? (
          <motion.div
            className="text-center py-12 bg-white rounded-2xl shadow-lg"
          >
            <p className="text-gray-600 text-lg">No cases submitted yet</p>
            <p className="text-gray-500 mt-2">Submit a new case to get started</p>
          </motion.div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary to-dark-blue text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Animal Type</th>
                    <th className="px-6 py-4 text-left">Disease</th>
                    <th className="px-6 py-4 text-left">Symptoms</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cases.map((caseItem) => (
                    <motion.tr
                      key={caseItem.id}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                      className="transition"
                    >
                      <td className="px-6 py-4 font-semibold">{caseItem.animal_type}</td>
                      <td className="px-6 py-4">{caseItem.disease_name || 'Pending'}</td>
                      <td className="px-6 py-4 text-sm truncate max-w-xs">{caseItem.symptoms}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            caseItem.status === 'resolved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {caseItem.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">{new Date(caseItem.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => setSelectedCase(caseItem)}
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
        )}

        {/* Detail Modal */}
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedCase(null)}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl space-y-4"
            >
              <h2 className="text-2xl font-bold text-gray-900">Case Details</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Animal Type</p>
                    <p className="font-semibold text-gray-900">{selectedCase.animal_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-gray-900">{selectedCase.location}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Symptoms</p>
                  <p className="font-semibold text-gray-900">{selectedCase.symptoms}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedCase.status === 'resolved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedCase.status.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Submitted On</p>
                    <p className="font-semibold text-gray-900">{new Date(selectedCase.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                {selectedCase.disease_name && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Diagnosed Disease</p>
                    <p className="font-bold text-primary text-lg">{selectedCase.disease_name}</p>
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedCase(null)}
                className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-dark-blue"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MyCases;
