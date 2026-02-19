import React from 'react';
import { motion } from 'framer-motion';
import { Map, MapPin } from 'lucide-react';

const LocationMonitoring = () => {
  return (
    <div className="flex-1 md:ml-64 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-4xl font-bold text-gray-900">Location Monitoring</h1>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-8 shadow-lg h-96 flex flex-col items-center justify-center"
        >
          <MapPin size={64} className="text-primary mb-4" />
          <p className="text-gray-600 text-lg">Google Maps Integration</p>
          <p className="text-gray-500 text-sm mt-2">
            Showing disease cases by location across the region
          </p>
          <div className="mt-8 w-full h-64 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Map size={48} className="text-primary mx-auto mb-2" />
              <p className="text-gray-600">Map would be rendered here</p>
              <p className="text-sm text-gray-500 mt-2">Configure GOOGLE_MAPS_API_KEY in environment</p>
            </div>
          </div>
        </motion.div>

        {/* Sample Location Data */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Active Cases by Region</h3>
          <div className="space-y-3">
            {[
              { region: 'North District', cases: 12, severity: 'Medium' },
              { region: 'South District', cases: 8, severity: 'Low' },
              { region: 'East District', cases: 15, severity: 'High' },
              { region: 'West District', cases: 5, severity: 'Low' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 10 }}
                className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-gray-900">{item.region}</p>
                  <p className="text-sm text-gray-600">{item.cases} active cases</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  item.severity === 'High'
                    ? 'bg-red-100 text-red-800'
                    : item.severity === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {item.severity}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LocationMonitoring;
