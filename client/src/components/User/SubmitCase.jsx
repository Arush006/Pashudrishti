import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Topbar from '../Shared/Topbar';
import toast from 'react-hot-toast';
import { Upload, AlertCircle, CheckCircle, Image as ImageIcon, Heart, Zap } from 'lucide-react';

const SubmitCase = () => {
  const [formData, setFormData] = useState({
    animalType: '',
    breed: '',
    age: '',
    weight: '',
    symptoms: '',
    duration: '',
    notes: '',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const animalTypes = ['Cattle', 'Buffalo', 'Goat', 'Sheep', 'Pig', 'Chicken', 'Duck', 'Other'];

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
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.animalType || !formData.symptoms || !formData.age || !formData.weight) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!imagePreview) {
      toast.error('Please upload an image of the animal');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      toast.success('Case submitted successfully! A doctor will review shortly.');
      
      // Reset form
      setTimeout(() => {
        setFormData({
          animalType: '',
          breed: '',
          age: '',
          weight: '',
          symptoms: '',
          duration: '',
          notes: '',
        });
        setImagePreview(null);
        setSubmitted(false);
      }, 3000);
    }, 1500);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <Topbar title="Submit New Case" />
        <div className="md:ml-64 p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle size={80} className="mx-auto text-green-600 mb-6" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Case Submitted Successfully!</h2>
              <p className="text-gray-600 text-lg mb-4">A veterinarian will review your case and contact you soon.</p>
              <p className="text-sm text-gray-500">Case ID: CASE-{Date.now()}</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <Topbar title="Submit New Case" />

      <div className="md:ml-64 p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Submit New Animal Health Case</h1>
          <p className="text-gray-600">Provide details and upload photos for veterinary consultation</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8"
          >
            {/* Image Upload */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Upload Animal Image <span className="text-red-500">*</span></label>
              <motion.label
                whileHover={{ scale: 1.02 }}
                className="block relative"
              >
                <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg mb-4" />
                      <p className="text-sm text-gray-600">Click to change image</p>
                    </>
                  ) : (
                    <>
                      <ImageIcon size={48} className="mx-auto text-blue-400 mb-3" />
                      <p className="text-gray-900 font-semibold mb-1">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-600">JPG, PNG up to 10MB</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
              </motion.label>
            </div>

            {/* Animal Type */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Animal Type <span className="text-red-500">*</span></label>
              <select
                name="animalType"
                value={formData.animalType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
                required
              >
                <option value="">Select animal type</option>
                {animalTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Breed */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Breed (Optional)</label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                placeholder="e.g., Holstein, Gir"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Age and Weight */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Age (Years) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g., 5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  min="0"
                  max="50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Weight (kg) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g., 500"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  step="0.1"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Symptoms */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Symptoms <span className="text-red-500">*</span></label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="Describe what symptoms you're observing (fever, cough, loss of appetite, discharge, etc.)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-32"
                required
              />
            </div>

            {/* Duration */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Duration (Optional)</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 3 days, 1 week"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Additional Notes */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Additional Notes (Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any other relevant information..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-24"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload size={20} />
              {loading ? 'Submitting...' : 'Submit Case for Review'}
            </motion.button>
          </motion.form>

          {/* Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Tips Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Zap size={20} className="text-blue-600" />
                Tips for Better Results
              </h3>
              <ul className="space-y-3 text-sm text-blue-900">
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>Upload clear, well-lit photos</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>Include multiple angles if possible</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>Be detailed about symptoms</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>Mention duration of illness</span>
                </li>
              </ul>
            </div>

            {/* Processing Info */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                <Heart size={20} className="text-green-600" />
                What Happens Next
              </h3>
              <ol className="space-y-3 text-sm text-green-900">
                <li><strong>1.</strong> AI analysis of your images</li>
                <li><strong>2.</strong> Doctor review (within 2 hours)</li>
                <li><strong>3.</strong> Consultation recommendation</li>
                <li><strong>4.</strong> Treatment plan provided</li>
              </ol>
            </div>

            {/* Urgent Help */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-red-50 border border-red-200 rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                <AlertCircle size={20} className="text-red-600" />
                Emergency?
              </h3>
              <p className="text-sm text-red-900 mb-4">For life-threatening emergencies, call immediately:</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full bg-red-600 text-white rounded-lg py-2 font-semibold hover:bg-red-700 transition"
              >
                📞 Emergency Hotline
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SubmitCase;
