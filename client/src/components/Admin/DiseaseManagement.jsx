import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { adminService } from '../../services/authService';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';

const DiseaseManagement = () => {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', treatment: '' });

  useEffect(() => {
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    try {
      const response = await adminService.getDiseases();
      setDiseases(response.data);
    } catch (error) {
      toast.error('Failed to fetch diseases');
    } finally {
      setLoading(false);
    }
  };

  const handleAddDisease = async (e) => {
    e.preventDefault();
    try {
      await adminService.addDisease(formData);
      toast.success('Disease added successfully');
      setFormData({ name: '', description: '', treatment: '' });
      setShowForm(false);
      fetchDiseases();
    } catch (error) {
      toast.error('Failed to add disease');
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
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-900">Disease Management</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-dark-blue text-white rounded-lg hover:shadow-lg transition"
          >
            <Plus size={20} />
            <span>Add Disease</span>
          </motion.button>
        </div>

        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleAddDisease}
            className="bg-white rounded-2xl p-6 shadow-lg space-y-4"
          >
            <input
              type="text"
              placeholder="Disease Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              required
            />
            <textarea
              placeholder="Treatment"
              value={formData.treatment}
              onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              required
            />
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Save
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </motion.button>
            </div>
          </motion.form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diseases.map((disease) => (
            <motion.div
              key={disease.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">{disease.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{disease.description}</p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700"><strong>Treatment:</strong> {disease.treatment}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DiseaseManagement;
