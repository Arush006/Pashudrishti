import api from './api';

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (email, password) => api.post('/auth/login', { email, password }),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export const adminService = {
  getDashboardStats: () => api.get('/admin/stats'),
  getDoctors: () => api.get('/admin/doctors'),
  approveDoctor: (doctorId) => api.put(`/admin/doctors/${doctorId}/approve`),
  suspendDoctor: (doctorId) => api.put(`/admin/doctors/${doctorId}/suspend`),
  getUsers: () => api.get('/admin/users'),
  suspendUser: (userId) => api.put(`/admin/users/${userId}/suspend`),
  getDiseases: () => api.get('/admin/diseases'),
  addDisease: (data) => api.post('/admin/diseases', data),
  broadcastNotification: (data) => api.post('/admin/notifications', data),
};

export const doctorService = {
  getDashboard: () => api.get('/doctor/dashboard'),
  getCaseRequests: () => api.get('/doctor/case-requests'),
  acceptCase: (caseId) => api.put(`/doctor/cases/${caseId}/accept`),
  addDiagnosis: (caseId, data) => api.put(`/doctor/cases/${caseId}/diagnosis`, data),
  markCaseResolved: (caseId) => api.put(`/doctor/cases/${caseId}/resolve`),
  requestPhysicalVisit: (caseId, data) => api.post(`/doctor/cases/${caseId}/physical-visit`, data),
  getCaseHistory: (search = '') => api.get(`/doctor/cases?search=${search}`),
};

export const userService = {
  getDashboard: () => api.get('/user/dashboard'),
  submitCase: (data) => api.post('/user/cases', data),
  getMyCases: () => api.get('/user/cases'),
  getNearbyDoctors: () => api.get('/user/doctors'),
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  sendMessage: (data) => api.post('/user/messages', data),
  getMessages: (caseId) => api.get(`/user/messages/${caseId}`),
};
