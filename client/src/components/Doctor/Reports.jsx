import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Download, Eye } from 'lucide-react';

const Reports = () => {
  const [reports] = useState([
    {
      id: 1,
      reportId: 'REP-001',
      patient: 'Farmer Singh',
      animal: 'Cow',
      disease: 'Foot and Mouth Disease',
      diagnosis: 'Viral infection affecting mucous membranes',
      treatment: 'Antiviral treatment with supportive care',
      date: '2024-01-15',
      status: 'completed',
    },
    {
      id: 2,
      reportId: 'REP-002',
      patient: 'Rajesh Patel',
      animal: 'Buffalo',
      disease: 'Mastitis',
      diagnosis: 'Bacterial infection in mammary gland',
      treatment: 'Antibiotic therapy and milk extraction',
      date: '2024-01-18',
      status: 'completed',
    },
    {
      id: 3,
      reportId: 'REP-003',
      patient: 'Priya Sharma',
      animal: 'Goat',
      disease: 'Pneumonia',
      diagnosis: 'Respiratory tract infection',
      treatment: 'Respiratory support and antibiotics',
      date: '2024-01-10',
      status: 'completed',
    },
    {
      id: 4,
      reportId: 'REP-004',
      patient: 'Amit Kumar',
      animal: 'Chicken',
      disease: 'Coccidiosis',
      diagnosis: 'Parasitic intestinal infection',
      treatment: 'Anticoccidial medication',
      date: '2024-01-16',
      status: 'completed',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = reports.filter(
    (r) =>
      r.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.reportId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.disease.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Medical Reports</h1>
        <p className="text-gray-600">View and download all your filed medical reports</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by patient name, report ID, or disease..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
        </div>
      </motion.div>

      {/* Reports Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-md overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Report ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Patient</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Animal</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Disease</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Diagnosis</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report, index) => (
                <motion.tr
                  key={report.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600">{report.reportId}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{report.patient}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.animal}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.disease}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.diagnosis}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition flex items-center space-x-1"
                      >
                        <Eye size={16} />
                        <span>View</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition flex items-center space-x-1"
                      >
                        <Download size={16} />
                        <span>Download</span>
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="p-8 text-center">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No reports found matching your search.</p>
          </div>
        )}
      </motion.div>

      {/* Report Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl p-6 shadow-md"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="text-blue-600" size={28} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl p-6 shadow-md"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="text-green-600" size={28} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{reports.filter(r => r.status === 'completed').length}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Reports;
