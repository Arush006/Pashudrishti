import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Save, X, MapPin, Phone, Mail, Award, Settings } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Ramesh Patel',
    email: 'ramesh.patel@email.com',
    phone: '+91 9876543210',
    location: 'Indore, Madhya Pradesh',
    farmName: 'Patel Dairy Farms',
    farmSize: '25 acres',
    animalCount: 45,
    primaryAnimals: 'Cattle, Buffalo, Goats',
    experience: '8 years',
    registrationDate: '2024-01-15',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  });

  const [editFormData, setEditFormData] = useState(profile);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSave = () => {
    setProfile(editFormData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditFormData(profile);
    setIsEditing(false);
  };

  return (
    <div className={`p-4 md:p-8 transition-colors ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('myProfile')}</h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('manageYourFarmInfo')}</p>
        </motion.div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`rounded-2xl shadow-md p-8 mb-8 transition-colors ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="flex flex-col md:flex-row items-start justify-between mb-6">
            <div className="flex items-start gap-6">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-600"
              />
              <div className="flex-1">
                {!isEditing ? (
                  <>
                    <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{profile.name}</h2>
                    <p className={`text-lg mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{profile.farmName}</p>
                    <div className={`flex items-center mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <MapPin size={18} className="mr-2 text-blue-500" />
                      {profile.location}
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className={`text-sm font-semibold block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>{t('fullName')}</label>
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditChange}
                        className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 border transition-colors ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      />
                    </div>
                    <div>
                      <label className={`text-sm font-semibold block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>{t('farmName')}</label>
                      <input
                        type="text"
                        name="farmName"
                        value={editFormData.farmName}
                        onChange={handleEditChange}
                        className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 border transition-colors ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      />
                    </div>
                    <div>
                      <label className={`text-sm font-semibold block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>{t('location')}</label>
                      <input
                        type="text"
                        name="location"
                        value={editFormData.location}
                        onChange={handleEditChange}
                        className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 border transition-colors ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {!isEditing ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
              >
                <Edit2 size={18} />
                {t('editProfile')}
              </motion.button>
            ) : (
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
                >
                  <Save size={18} />
                  {t('save')}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition flex items-center gap-2"
                >
                  <X size={18} />
                  {t('cancel')}
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-2xl shadow-md p-6 mb-8 transition-colors ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        >
          <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('contactInformation')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`text-sm font-semibold block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>{t('email')}</label>
              {!isEditing ? (
                <div className={`flex items-center text-lg ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                  <Mail size={20} className="mr-3 text-blue-500" />
                  {profile.email}
                </div>
              ) : (
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditChange}
                  className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 border transition-colors ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              )}
            </div>
            <div>
              <label className={`text-sm font-semibold block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>{t('phone')}</label>
              {!isEditing ? (
                <div className={`flex items-center text-lg ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                  <Phone size={20} className="mr-3 text-blue-500" />
                  {profile.phone}
                </div>
              ) : (
                <input
                  type="tel"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleEditChange}
                  className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 border transition-colors ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* Farm Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`rounded-2xl shadow-md p-6 mb-8 transition-colors ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        >
          <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('farmInformation')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`rounded-xl p-6 transition-colors ${isDark ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50'}`}>
              <div className={`text-sm font-semibold mb-1 ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>Farm Size</div>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {!isEditing ? profile.farmSize : <input type="text" name="farmSize" value={editFormData.farmSize} onChange={handleEditChange} className={`w-full px-3 py-2 rounded-lg border transition-colors ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />}
              </div>
            </div>
            <div className={`rounded-xl p-6 transition-colors ${isDark ? 'bg-green-900/30 border border-green-700' : 'bg-green-50'}`}>
              <div className={`text-sm font-semibold mb-1 ${isDark ? 'text-green-300' : 'text-green-600'}`}>Total Animals</div>
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {!isEditing ? profile.animalCount : <input type="number" name="animalCount" value={editFormData.animalCount} onChange={handleEditChange} className={`w-full px-3 py-2 rounded-lg border transition-colors ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />}
              </div>
            </div>
            <div className={`rounded-xl p-6 transition-colors ${isDark ? 'bg-purple-900/30 border border-purple-700' : 'bg-purple-50'}`}>
              <div className={`text-sm font-semibold mb-1 ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>Primary Animals</div>
              <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {!isEditing ? profile.primaryAnimals : <input type="text" name="primaryAnimals" value={editFormData.primaryAnimals} onChange={handleEditChange} className={`w-full px-3 py-2 rounded-lg border transition-colors ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />}
              </div>
            </div>
            <div className={`rounded-xl p-6 transition-colors ${isDark ? 'bg-orange-900/30 border border-orange-700' : 'bg-orange-50'}`}>
              <div className={`text-sm font-semibold mb-1 ${isDark ? 'text-orange-300' : 'text-orange-600'}`}>Experience</div>
              <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {!isEditing ? profile.experience : <input type="text" name="experience" value={editFormData.experience} onChange={handleEditChange} className={`w-full px-3 py-2 rounded-lg border transition-colors ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Account Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`rounded-2xl shadow-md p-6 transition-colors ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Account Information</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/user/settings')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Settings size={18} />
              {t('settings')}
            </motion.button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`flex items-center p-4 rounded-xl transition-colors ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <Award size={24} className="text-blue-600 mr-4 flex-shrink-0" />
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Member Since</p>
                <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{profile.registrationDate}</p>
              </div>
            </div>
            <div className={`flex items-center p-4 rounded-xl transition-colors ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <Settings size={24} className="text-green-600 mr-4 flex-shrink-0" />
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Account Status</p>
                <p className={`text-lg font-semibold text-green-600`}>Active</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
  );
};


export default Profile;
