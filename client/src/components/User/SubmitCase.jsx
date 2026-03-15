import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Upload, AlertCircle, CheckCircle, Image as ImageIcon, Heart, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const SubmitCase = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
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
      <div className={`p-4 md:p-8 transition-colors ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className={`rounded-2xl shadow-lg p-12 text-center transition-colors ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle size={80} className="mx-auto text-green-600 mb-6" />
              </motion.div>
              <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('caseSubmittedSuccessfully')}</h2>
              <p className={`text-lg mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('vetWillReviewSoon')}</p>
              <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Case ID: CASE-{Date.now()}</p>
            </div>
          </motion.div>
        </div>
    );
  }

  return (
    <div className={`p-4 md:p-8 transition-colors ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('submitNewAnimalCase')}</h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('provideDetailsAndUploadPhotos')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`lg:col-span-2 rounded-2xl shadow-md p-8 transition-colors ${isDark ? 'bg-gray-800' : 'bg-white'}`}
          >
            {/* Image Upload */}
            <div className="mb-8">
              <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('uploadAnimalImage')} <span className="text-red-500">*</span></label>
              <motion.label
                whileHover={{ scale: 1.02 }}
                className="block relative"
              >
                <div className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${isDark ? 'border-blue-500/50 hover:border-blue-500 hover:bg-blue-900/20' : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'}`}>
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg mb-4" />
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('clickToChangeImage')}</p>
                    </>
                  ) : (
                    <>
                      <ImageIcon size={48} className={`mx-auto mb-3 ${isDark ? 'text-blue-500/60' : 'text-blue-400'}`} />
                      <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('clickToUploadOrDrag')}</p>
                      <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{t('jpgPngUpTo10MB')}</p>
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
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('animalType')} <span className="text-red-500">*</span></label>
              <select
                name="animalType"
                value={formData.animalType}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 border transition ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                required
              >
                <option value="">{t('selectAnimalType')}</option>
                {animalTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Breed */}
            <div className="mb-6">
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('breed')} (Optional)</label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                placeholder={t('breedPlaceholder')}
                className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 border transition ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>

            {/* Age and Weight */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('ageYears')} <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g., 5"
                  className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 border transition ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900'}`}
                  min="0"
                  max="50"
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('weightKg')} <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g., 500"
                  className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 border transition ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900'}`}
                  step="0.1"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Symptoms */}
            <div className="mb-6">
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('symptoms')} <span className="text-red-500">*</span></label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder={t('symptomsPlaceholder')}
                className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 h-32 border transition ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900'}`}
                required
              />
            </div>

            {/* Duration */}
            <div className="mb-6">
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('duration')} (Optional)</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder={t('durationPlaceholder')}
                className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 border transition ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>

            {/* Additional Notes */}
            <div className="mb-8">
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('additionalNotes')} (Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder={t('notesPlaceholder')}
                className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 h-24 border transition ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900'}`}
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
              {loading ? t('submitting') : t('submitCaseForReview')}
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
            <div className={`border rounded-2xl p-6 transition-colors ${isDark ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
              <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>
                <Zap size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                {t('tipsForBetterResults')}
              </h3>
              <ul className={`space-y-3 text-sm ${isDark ? 'text-blue-200' : 'text-blue-900'}`}>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>{t('uploadClearWellLit')}</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>{t('includeMultipleAngles')}</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>{t('beDetailedAboutSymptoms')}</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>{t('mentionDurationOfIllness')}</span>
                </li>
              </ul>
            </div>

            {/* Processing Info */}
            <div className={`border rounded-2xl p-6 transition-colors ${isDark ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200'}`}>
              <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-green-300' : 'text-green-900'}`}>
                <Heart size={20} className={isDark ? 'text-green-400' : 'text-green-600'} />
                {t('whatHappensNext')}
              </h3>
              <ol className={`space-y-3 text-sm ${isDark ? 'text-green-200' : 'text-green-900'}`}>
                <li className="flex gap-2">
                  <strong>1.</strong> {t('aiAnalysisOfImages')}
                </li>
                <li className="flex gap-2">
                  <strong>2.</strong> {t('doctorReviewWithin')}
                </li>
                <li className="flex gap-2">
                  <strong>3.</strong> {t('consultationRecommendation')}
                </li>
                <li className="flex gap-2">
                  <strong>4.</strong> {t('treatmentPlanProvided')}
                </li>
              </ol>
            </div>

            {/* Urgent Help */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`border rounded-2xl p-6 transition-colors ${isDark ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'}`}
            >
              <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${isDark ? 'text-red-300' : 'text-red-900'}`}>
                <AlertCircle size={20} className={isDark ? 'text-red-400' : 'text-red-600'} />
                Emergency?
              </h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-red-200' : 'text-red-900'}`}>For life-threatening emergencies, call immediately:</p>
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
  );
};

export default SubmitCase;
