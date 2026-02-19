import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Topbar from '../Shared/Topbar';
import { MapPin, Star, Phone, Mail, Search, Filter, Calendar } from 'lucide-react';


const NearbyDoctors = () => {
  const [doctors] = useState([
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      specialty: 'Large Animal Specialist',
      experience: '12 years',
      location: 'Indore, MP',
      distance: '2.5 km',
      rating: 4.8,
      reviews: 156,
      phone: '+91 9876543210',
      email: 'rajesh.kumar@vetclinic.com',
      availability: 'Mon - Sat',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    },
    {
      id: 2,
      name: 'Dr. Priya Singh',
      specialty: 'Dairy & Cattle Expert',
      experience: '10 years',
      location: 'Indore, MP',
      distance: '3.8 km',
      rating: 4.9,
      reviews: 203,
      phone: '+91 9876543211',
      email: 'priya.singh@vetclinic.com',
      availability: 'Mon - Sun',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    {
      id: 3,
      name: 'Dr. Amit Patel',
      specialty: 'Poultry & Small Animals',
      experience: '8 years',
      location: 'Indore, MP',
      distance: '4.2 km',
      rating: 4.7,
      reviews: 89,
      phone: '+91 9876543212',
      email: 'amit.patel@vetclinic.com',
      availability: 'Tue - Sat',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      id: 4,
      name: 'Dr. Sarah Johnson',
      specialty: 'Emergency Veterinary Care',
      experience: '15 years',
      location: 'Indore, MP',
      distance: '5.1 km',
      rating: 4.9,
      reviews: 342,
      phone: '+91 9876543213',
      email: 'sarah.johnson@vetclinic.com',
      availability: '24/7',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');

  const specialties = ['all', 'Large Animal Specialist', 'Dairy & Cattle Expert', 'Poultry & Small Animals', 'Emergency Veterinary Care'];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty === 'all' || doctor.specialty === filterSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <Topbar title="Find Veterinarians" />

      <div className="md:ml-64 p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Veterinarians</h1>
          <p className="text-gray-600">Connect with experienced veterinary doctors near you</p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by doctor name, specialty, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-gray-900"
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty === 'all' ? 'All Specialties' : specialty}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Doctors Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Doctor Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-md">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">{doctor.rating}</span>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                <p className="text-sm text-blue-600 font-semibold mb-3">{doctor.specialty}</p>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center text-gray-600">
                    <span className="font-semibold text-gray-900 w-20">Experience:</span>
                    {doctor.experience}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2 text-blue-500 flex-shrink-0" />
                    <span>{doctor.location}</span>
                    <span className="ml-auto font-semibold text-green-600">{doctor.distance}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2 text-blue-500 flex-shrink-0" />
                    <span>{doctor.availability}</span>
                  </div>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(doctor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">({doctor.reviews} reviews)</span>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Phone size={16} className="mr-2 text-blue-500 flex-shrink-0" />
                    <a href={`tel:${doctor.phone}`} className="hover:text-blue-600">{doctor.phone}</a>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Mail size={16} className="mr-2 text-blue-500 flex-shrink-0" />
                    <a href={`mailto:${doctor.email}`} className="hover:text-blue-600 truncate">{doctor.email}</a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                  >
                    Book Appointment
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition"
                  >
                    View Profile
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredDoctors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white rounded-2xl shadow-md mt-8"
          >
            <Search size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">No doctors found matching your criteria</p>
          </motion.div>
        )}

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Emergency Veterinary Care?</h3>
          <p className="text-blue-800">Call Dr. Sarah Johnson (24/7 Emergency Services) at +91 9876543213 or email sarah.johnson@vetclinic.com</p>
        </motion.div>
      </div>
    </div>
  );
};

export default NearbyDoctors;
