import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { doctorService } from '../../services/authService';
import toast from 'react-hot-toast';
import { Search } from 'lucide-react';

const CaseHistory = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCaseHistory = async () => {
      try {
        const response = await doctorService.getCaseHistory(searchTerm);
        setCases(response.data);
      } catch (error) {
        toast.error('Failed to fetch case history');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseHistory();
  }, [searchTerm]);

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin h-12 w-12 border-b-2 border-primary"></div></div>;

  return (
    <div className="flex-1 md:ml-64 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-4xl font-bold text-gray-900">Case History</h1>

        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by patient name, animal type, or disease..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-primary to-dark-blue text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Patient</th>
                  <th className="px-6 py-4 text-left">Animal Type</th>
                  <th className="px-6 py-4 text-left">Disease</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cases.map((caseItem) => (
                  <motion.tr
                    key={caseItem.id}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                    className="transition"
                  >
                    <td className="px-6 py-4 font-semibold">{caseItem.user_name}</td>
                    <td className="px-6 py-4">{caseItem.animal_type}</td>
                    <td className="px-6 py-4">{caseItem.disease_name || 'Pending'}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          caseItem.status === 'resolved'
                            ? 'bg-green-100 text-green-800'
                            : caseItem.status === 'in_progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {caseItem.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">{new Date(caseItem.created_at).toLocaleDateString()}</td>
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

export default CaseHistory;
