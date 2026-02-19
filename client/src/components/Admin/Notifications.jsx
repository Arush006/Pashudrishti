import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { adminService } from '../../services/authService';
import toast from 'react-hot-toast';
import { Send } from 'lucide-react';

const Notifications = () => {
  const [formData, setFormData] = useState({ title: '', message: '', target_role: 'user' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await adminService.broadcastNotification(formData);
      toast.success('Notification sent successfully');
      setFormData({ title: '', message: '', target_role: 'user' });
    } catch (error) {
      toast.error('Failed to send notification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 md:ml-64 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl space-y-6"
      >
        <h1 className="text-4xl font-bold text-gray-900">Send Notifications</h1>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 shadow-lg space-y-6"
        >
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Target Role</label>
            <select
              value={formData.target_role}
              onChange={(e) => setFormData({ ...formData, target_role: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="user">Farmers (Users)</option>
              <option value="doctor">Veterinarians (Doctors)</option>
              <option value="admin">Admins</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              placeholder="Notification Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea
              placeholder="Notification Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary h-32"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-primary to-dark-blue text-white rounded-lg hover:shadow-lg transition flex items-center justify-center space-x-2"
          >
            <Send size={20} />
            <span>{loading ? 'Sending...' : 'Send Notification'}</span>
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Notifications;
