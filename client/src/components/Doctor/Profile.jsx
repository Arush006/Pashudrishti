import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Topbar from '../Shared/Topbar';
import { User, Mail, Phone, MapPin, Award, Star, Edit2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: user.name || 'Dr. Rajesh Kumar',
    email: user.email || 'doctor@pashudrishti.com',
    phone: '+91 9988888888',
    specialization: 'General Veterinary Medicine',
    licenseNumber: 'LIC-2024-001',
    experience: '8 years',
    location: 'Delhi, India',
    about:
      'Experienced veterinarian with a passion for helping animals and farmers. Specialized in treating livestock diseases and providing quality healthcare to animals.',
    rating: 4.8,
    casesHandled: 156,
    successRate: 92,
  });

  const [editData, setEditData] = useState(profile);

  const handleSave = () => {
    setProfile(editData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditData(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <Topbar title="Profile" />

      <div className="md:ml-64 p-4 md:p-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Doctor Profile</h1>
              <p className="text-gray-600">Manage your professional information</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition ${
                isEditing
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isEditing ? (
                <>
                  <X size={20} />
                  <span>Cancel</span>
                </>
              ) : (
                <>
                  <Edit2 size={20} />
                  <span>Edit Profile</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-md p-8 mb-8"
        >
          {/* Avatar and Basic Info */}
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8 mb-8 pb-8 border-b border-gray-200">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-4xl font-bold"
            >
              {profile.name.charAt(0)}
            </motion.div>

            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="text-3xl font-bold text-gray-900 border-b-2 border-blue-600 focus:outline-none mb-2 w-full"
                />
              ) : (
                <h2 className="text-3xl font-bold text-gray-900">{profile.name}</h2>
              )}

              {isEditing ? (
                <input
                  type="text"
                  value={editData.specialization}
                  onChange={(e) => setEditData({ ...editData, specialization: e.target.value })}
                  className="text-lg text-blue-600 border-b-2 border-blue-600 focus:outline-none w-full"
                />
              ) : (
                <p className="text-lg text-blue-600">{profile.specialization}</p>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 bg-blue-50 rounded-lg"
            >
              <Star size={28} className="mx-auto text-yellow-500 mb-2" />
              <p className="text-2xl font-bold text-gray-900">{profile.rating}</p>
              <p className="text-sm text-gray-600">Ratings</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 bg-green-50 rounded-lg"
            >
              <Award size={28} className="mx-auto text-green-600 mb-2" />
              <p className="text-2xl font-bold text-gray-900">{profile.casesHandled}</p>
              <p className="text-sm text-gray-600">Cases Handled</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 bg-purple-50 rounded-lg"
            >
              <svg className="w-7 h-7 mx-auto text-purple-600 mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <p className="text-2xl font-bold text-gray-900">{profile.successRate}%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 bg-orange-50 rounded-lg"
            >
              <svg className="w-7 h-7 mx-auto text-orange-600 mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a2 2 0 012 2v2H4V9a2 2 0 012-2h8zm8 8H4v2a2 2 0 002 2h8a2 2 0 002-2v-2z" clipRule="evenodd" />
              </svg>
              <p className="text-2xl font-bold text-gray-900">{profile.experience}</p>
              <p className="text-sm text-gray-600">Experience</p>
            </motion.div>
          </motion.div>

          {/* Contact & Professional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            {/* Email */}
            <div>
              <label className="flex items-center space-x-2 text-gray-600 text-sm font-semibold mb-2">
                <Mail size={18} />
                <span>Email Address</span>
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900 font-semibold">{profile.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center space-x-2 text-gray-600 text-sm font-semibold mb-2">
                <Phone size={18} />
                <span>Phone Number</span>
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900 font-semibold">{profile.phone}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center space-x-2 text-gray-600 text-sm font-semibold mb-2">
                <MapPin size={18} />
                <span>Location</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.location}
                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900 font-semibold">{profile.location}</p>
              )}
            </div>

            {/* License */}
            <div>
              <label className="flex items-center space-x-2 text-gray-600 text-sm font-semibold mb-2">
                <Award size={18} />
                <span>License Number</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.licenseNumber}
                  onChange={(e) => setEditData({ ...editData, licenseNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900 font-semibold">{profile.licenseNumber}</p>
              )}
            </div>
          </motion.div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-gray-600 text-sm font-semibold mb-2">About You</label>
            {isEditing ? (
              <textarea
                value={editData.about}
                onChange={(e) => setEditData({ ...editData, about: e.target.value })}
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-900 leading-relaxed">{profile.about}</p>
            )}
          </motion.div>

          {/* Action Buttons */}
          {isEditing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex space-x-4 mt-8 pt-8 border-t border-gray-200"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center space-x-2"
              >
                <Save size={20} />
                <span>Save Changes</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancel}
                className="flex-1 px-6 py-3 bg-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                Cancel
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
