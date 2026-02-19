import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { userService } from '../../services/authService';
import toast from 'react-hot-toast';
import { Upload, Zap, Heart, Image as ImageIcon } from 'lucide-react';

const SubmitCase = () => {
  const [formData, setFormData] = useState({
    animalType: '',
    symptoms: '',
    age: '',
    weight: '',
    location: 'Auto-detected',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [aiResult, setAiResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await userService.submitCase(formData);
      setAiResult(response.data.aiPrediction);
      toast.success('Case submitted successfully!');
      // Reset form
      setTimeout(() => {
        setFormData({
          animalType: '',
          symptoms: '',
          age: '',
          weight: '',
          location: 'Auto-detected',
          imageUrl: ''
        });
        setImagePreview(null);
      }, 2000);
    } catch (error) {
      toast.error('Failed to submit case');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 md:ml-64 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <h1 className="text-4xl font-bold text-gray-900">Submit New Case</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 shadow-lg space-y-5"
          >
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Upload Animal Photo</label>
              <motion.label
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-primary rounded-lg cursor-pointer hover:bg-blue-50 transition"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="max-h-32 rounded-lg" />
                ) : (
                  <div className="text-center">
                    <ImageIcon size={32} className="mx-auto text-primary mb-2" />
                    <p className="text-gray-600">Click to upload image</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
              </motion.label>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Animal Type</label>
              <select
                name="animalType"
                value={formData.animalType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              >
                <option value="">Select animal type</option>
                <option value="Cow">Cow</option>
                <option value="Buffalo">Buffalo</option>
                <option value="Goat">Goat</option>
                <option value="Sheep">Sheep</option>
                <option value="Pig">Pig</option>
                <option value="Chicken">Chicken</option>
                <option value="Horse">Horse</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Symptoms</label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="Describe the symptoms (e.g., fever, cough, loss of appetite)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary h-24"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Age (Years)</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g., 5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g., 500"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
                disabled
              />
              <p className="text-sm text-gray-500 mt-1">📍 Location auto-detected from GPS</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary to-dark-blue text-white rounded-lg hover:shadow-lg transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Upload size={20} />
              <span>{loading ? 'Submitting...' : 'Submit Case'}</span>
            </motion.button>
          </motion.form>

          {/* AI Result */}
          {aiResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg space-y-4"
            >
              <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <Zap size={28} className="text-yellow-500" />
                <span>AI Analysis</span>
              </h3>

              <div className="bg-white rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Predicted Disease</p>
                  <p className="text-xl font-bold text-primary">{aiResult.disease}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Confidence Level</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${aiResult.confidence}%` }}
                        transition={{ duration: 1 }}
                        className="bg-gradient-to-r from-primary to-dark-blue h-2 rounded-full"
                      />
                    </div>
                    <span className="font-bold">{aiResult.confidence}%</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">First Aid Steps</p>
                  <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                    <p className="text-gray-700">{aiResult.firstAid}</p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-dark-blue flex items-center justify-center space-x-2"
              >
                <Heart size={20} />
                <span>Consult Doctor</span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SubmitCase;
