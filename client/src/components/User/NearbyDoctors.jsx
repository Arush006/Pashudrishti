import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Phone, Mail, Search, Filter, Calendar } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

// Fix for leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DoctorMarker = ({ doctor }) => (
  <Marker position={[doctor.latitude, doctor.longitude]}>
    <Popup>
      <div className="text-center">
        <h3 className="font-bold text-gray-900">{doctor.name}</h3>
        <p className="text-sm text-blue-600">{doctor.specialty}</p>
        <p className="text-xs text-gray-600">{doctor.distance} away</p>
      </div>
    </Popup>
  </Marker>
);

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
      latitude: 22.7196,
      longitude: 75.8577,
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
      latitude: 22.7345,
      longitude: 75.8622,
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
      latitude: 22.7050,
      longitude: 75.8540,
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
      latitude: 22.7400,
      longitude: 75.8700,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const specialties = ['all', 'Large Animal Specialist', 'Dairy & Cattle Expert', 'Poultry & Small Animals', 'Emergency Veterinary Care'];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty === 'all' || doctor.specialty === filterSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className={`p-4 md:p-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen transition-colors duration-300`}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('findVeterinarians')}</h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('connectWithDoctors')}</p>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md overflow-hidden`}>
            <div className={`p-4 border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
              <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>📍 {t('doctorsLocationMap')}</h2>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('clickMarkersForDetails')}</p>
            </div>
            <div className="relative w-full h-96 md:h-96">
              <MapContainer
                center={[22.7196, 75.8577]}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
                className="z-10"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {doctors.map((doctor) => (
                  <DoctorMarker key={doctor.id} doctor={doctor} />
                ))}
              </MapContainer>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <div className="relative">
            <Search className={`absolute left-4 top-3.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
            <input
              type="text"
              placeholder={t('searchByDoctorName')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 text-gray-900'}`}
            />
          </div>

          <div className="relative">
            <Filter className={`absolute left-4 top-3.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300 text-gray-900'}`}
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty === 'all' ? t('allSpecialties') : specialty}
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
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow`}
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
                <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{doctor.name}</h3>
                <p className="text-sm text-blue-600 font-semibold mb-3">{doctor.specialty}</p>

                <div className="space-y-2 text-sm mb-4">
                  <div className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className={`font-semibold w-20 ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{t('experience')}:</span>
                    {doctor.experience}
                  </div>
                  <div className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <MapPin size={16} className="mr-2 text-blue-500 flex-shrink-0" />
                    <span>{doctor.location}</span>
                    <span className={`ml-auto font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>{doctor.distance}</span>
                  </div>
                  <div className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Calendar size={16} className="mr-2 text-blue-500 flex-shrink-0" />
                    <span>{doctor.availability}</span>
                  </div>
                </div>

                {/* Rating and Reviews */}
                <div className={`flex items-center gap-2 mb-4 pb-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(doctor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>({doctor.reviews} {t('ratingAndReviews')})</span>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Phone size={16} className="mr-2 text-blue-500 flex-shrink-0" />
                    <a href={`tel:${doctor.phone}`} className={isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'}>{doctor.phone}</a>
                  </div>
                  <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Mail size={16} className="mr-2 text-blue-500 flex-shrink-0" />
                    <a href={`mailto:${doctor.email}`} className={`${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} truncate`}>{doctor.email}</a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                  >
                    {t('bookAppointment')}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition"
                  >
                    {t('viewProfile')}
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
            className={`text-center py-12 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md mt-8`}
          >
            <Search size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('noDoctorsFound')}</p>
          </motion.div>
        )}

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`mt-12 border rounded-2xl p-6 ${isDark ? 'bg-green-900 border-green-700' : 'bg-blue-50 border-blue-200'}`}
        >
          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-green-300' : 'text-blue-900'}`}>{t('emergencyVeterinaryCare')}</h3>
          <p className={isDark ? 'text-green-200' : 'text-blue-800'}>Call Dr. Sarah Johnson (24/7 Emergency Services) at +91 9876543213 or email sarah.johnson@vetclinic.com</p>
        </motion.div>
      </div>
  );
};

export default NearbyDoctors;
