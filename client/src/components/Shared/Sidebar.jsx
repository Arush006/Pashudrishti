import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ sidebarItems, userRole }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-lg md:hidden"
        whileHover={{ scale: 1.1 }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-primary to-dark-blue text-white shadow-lg z-40 overflow-y-auto hidden md:flex flex-col"
      >
        <div className="p-8">
          <h1 className="text-2xl font-bold">Pashudrishti</h1>
          <p className="text-blue-200 text-sm">Disease Detection</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {sidebarItems.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to={item.path}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-400 transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          className="mx-4 mb-4 flex items-center space-x-2 w-full px-4 py-3 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </motion.button>
      </motion.div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
