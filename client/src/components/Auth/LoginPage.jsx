import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../../services/authService';
import { Mail, Lock, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (isLogin) {
        response = await authService.login(formData.email, formData.password);
      } else {
        response = await authService.register(formData);
      }

      const { user, token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success(
        isLogin ? 'Login successful!' : 'Registration successful!'
      );

      const redirectPath = {
        admin: '/admin/dashboard',
        doctor: '/doctor/dashboard',
        user: '/user/dashboard',
      }[user.role];

      navigate(redirectPath || '/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
        animate={{ x: [0, -50, 0], y: [0, -50, 0] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        {/* Glassmorphism Card */}
        <motion.div
          className="backdrop-blur-md bg-white bg-opacity-10 border border-white border-opacity-20 rounded-3xl p-8 shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold text-white text-center mb-2"
          >
            Pashudrishti
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-blue-100 text-center mb-8"
          >
            AI-Powered Animal Disease Detection
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <motion.div variants={itemVariants}>
                <label className="block text-white text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:bg-opacity-20 transition"
                  placeholder="Your name"
                />
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <label className="block text-white text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-blue-200" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-10 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:bg-opacity-20 transition"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-blue-200" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-10 pr-12 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:bg-opacity-20 transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-blue-200 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            {!isLogin && (
              <motion.div variants={itemVariants}>
                <label className="block text-white text-sm font-medium mb-2">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white focus:outline-none focus:bg-opacity-20 transition"
                >
                  <option value="user" className="text-gray-900">
                    Farmer (User)
                  </option>
                  <option value="doctor" className="text-gray-900">
                    Veterinarian (Doctor)
                  </option>
                </select>
              </motion.div>
            )}

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLogin ? (
                <>
                  <LogIn size={20} />
                  <span>{loading ? 'Logging in...' : 'Login'}</span>
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  <span>{loading ? 'Registering...' : 'Register'}</span>
                </>
              )}
            </motion.button>
          </form>

          <motion.button
            variants={itemVariants}
            onClick={() => setIsLogin(!isLogin)}
            className="w-full mt-4 text-white text-sm hover:text-blue-200 transition"
          >
            {isLogin
              ? "Don't have an account? Register"
              : 'Already have an account? Login'}
          </motion.button>
        </motion.div>

        {/* Demo Credentials */}
        <motion.div
          variants={itemVariants}
          className="mt-8 text-white text-center text-sm"
        >
          <p className="mb-4">📱 Demo Credentials:</p>
          <div className="space-y-2 text-blue-100">
            <p>Admin: admin@pashudrishti.com / password123</p>
            <p>Doctor: doctor@pashudrishti.com / password123</p>
            <p>User: user@pashudrishti.com / password123</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
