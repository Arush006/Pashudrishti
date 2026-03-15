import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { doctorService } from '../../services/authService';
import toast from 'react-hot-toast';
import { CheckCircle, MessageSquare, Stethoscope } from 'lucide-react';

const CaseRequests = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCase, setExpandedCase] = useState(null);
  const [diagnosis, setDiagnosis] = useState({ diagnosis: '', medication: '', notes: '' });

  useEffect(() => {
    fetchCaseRequests();
  }, []);

  const fetchCaseRequests = async () => {
    try {
      const response = await doctorService.getCaseRequests();
      setCases(response.data);
    } catch (error) {
      toast.error('Failed to fetch case requests');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptCase = async (caseId) => {
    try {
      await doctorService.acceptCase(caseId);
      toast.success('Case accepted successfully');
      fetchCaseRequests();
    } catch (error) {
      toast.error('Failed to accept case');
    }
  };

  const handleAddDiagnosis = async (caseId) => {
    try {
      await doctorService.addDiagnosis(caseId, diagnosis);
      toast.success('Diagnosis added successfully');
      setExpandedCase(null);
      setDiagnosis({ diagnosis: '', medication: '', notes: '' });
      fetchCaseRequests();
    } catch (error) {
      toast.error('Failed to add diagnosis');
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
        <h1 className="text-4xl font-bold text-gray-900">Case Requests</h1>

        <div className="space-y-4">
          {cases.length === 0 ? (
            <motion.div
              className="text-center py-12 bg-white rounded-2xl shadow-lg"
            >
              <p className="text-gray-600 text-lg">No new case requests</p>
            </motion.div>
          ) : (
            cases.map((caseItem) => (
              <motion.div
                key={caseItem.id}
                layout
                className="bg-white rounded-2xl p-6 shadow-lg space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{caseItem.user_name}</h3>
                    <p className="text-gray-600">Animal: {caseItem.animal_type}</p>
                    <p className="text-sm text-gray-500">Location: {caseItem.location}</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                    New Request
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Symptoms</h4>
                  <p className="text-gray-700">{caseItem.symptoms}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Age</p>
                    <p className="font-semibold text-gray-900">{caseItem.age} years</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Weight</p>
                    <p className="font-semibold text-gray-900">{caseItem.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Contact</p>
                    <p className="font-semibold text-gray-900">{caseItem.phone}</p>
                  </div>
                </div>

                {expandedCase === caseItem.id ? (
                  <motion.form
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddDiagnosis(caseItem.id);
                    }}
                    className="space-y-4 mt-4 pt-4 border-t border-gray-200"
                  >
                    <textarea
                      placeholder="Diagnosis"
                      value={diagnosis.diagnosis}
                      onChange={(e) => setDiagnosis({ ...diagnosis, diagnosis: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      required
                    />
                    <input
                      placeholder="Prescribed Medication"
                      value={diagnosis.medication}
                      onChange={(e) => setDiagnosis({ ...diagnosis, medication: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      required
                    />
                    <textarea
                      placeholder="Additional Notes"
                      value={diagnosis.notes}
                      onChange={(e) => setDiagnosis({ ...diagnosis, notes: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        type="submit"
                        className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        <CheckCircle className="inline mr-2" size={18} />
                        Save Diagnosis
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        type="button"
                        onClick={() => setExpandedCase(null)}
                        className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </motion.form>
                ) : (
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleAcceptCase(caseItem.id)}
                      className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-dark-blue flex items-center justify-center space-x-2"
                    >
                      <Stethoscope size={18} />
                      <span>Accept Case</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setExpandedCase(caseItem.id)}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2"
                    >
                      <MessageSquare size={18} />
                      <span>Add Diagnosis</span>
                    </motion.button>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CaseRequests;
