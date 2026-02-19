import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Topbar from '../Shared/Topbar';
import { Edit2, Save, X, MapPin, Phone, Mail, Award, Settings } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
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
    <div className="min-h-screen bg-gray-50 pt-24">
      <Topbar title="User Profile" />

      <div className="md:ml-64 p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your farm and personal information</p>
        </motion.div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-md p-8 mb-8"
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
                    <h2 className="text-3xl font-bold text-gray-900">{profile.name}</h2>
                    <p className="text-gray-600 text-lg mt-1">{profile.farmName}</p>
                    <div className="flex items-center text-gray-600 mt-2">
                      <MapPin size={18} className="mr-2 text-blue-500" />
                      {profile.location}
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Farm Name</label>
                      <input
                        type="text"
                        name="farmName"
                        value={editFormData.farmName}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={editFormData.location}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
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
                Edit Profile
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
                  Save
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition flex items-center gap-2"
                >
                  <X size={18} />
                  Cancel
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
          className="bg-white rounded-2xl shadow-md p-6 mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Email</label>
              {!isEditing ? (
                <div className="flex items-center text-gray-900 text-lg">
                  <Mail size={20} className="mr-3 text-blue-500" />
                  {profile.email}
                </div>
              ) : (
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              )}
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Phone</label>
              {!isEditing ? (
                <div className="flex items-center text-gray-900 text-lg">
                  <Phone size={20} className="mr-3 text-blue-500" />
                  {profile.phone}
                </div>
              ) : (
                <input
                  type="tel"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
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
          className="bg-white rounded-2xl shadow-md p-6 mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Farm Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="text-sm font-semibold text-blue-600 mb-1">Farm Size</div>
              <div className="text-2xl font-bold text-gray-900">
                {!isEditing ? profile.farmSize : <input type="text" name="farmSize" value={editFormData.farmSize} onChange={handleEditChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />}
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-6">
              <div className="text-sm font-semibold text-green-600 mb-1">Total Animals</div>
              <div className="text-2xl font-bold text-gray-900">
                {!isEditing ? profile.animalCount : <input type="number" name="animalCount" value={editFormData.animalCount} onChange={handleEditChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />}
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6">
              <div className="text-sm font-semibold text-purple-600 mb-1">Primary Animals</div>
              <div className="text-lg font-bold text-gray-900">
                {!isEditing ? profile.primaryAnimals : <input type="text" name="primaryAnimals" value={editFormData.primaryAnimals} onChange={handleEditChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />}
              </div>
            </div>
            <div className="bg-orange-50 rounded-xl p-6">
              <div className="text-sm font-semibold text-orange-600 mb-1">Experience</div>
              <div className="text-lg font-bold text-gray-900">
                {!isEditing ? profile.experience : <input type="text" name="experience" value={editFormData.experience} onChange={handleEditChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Account Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
              <Award size={24} className="text-blue-600 mr-4 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="text-lg font-semibold text-gray-900">{profile.registrationDate}</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
              <Settings size={24} className="text-blue-600 mr-4 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Account Status</p>
                <p className="text-lg font-semibold text-green-600">Active</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


export default Profile;
