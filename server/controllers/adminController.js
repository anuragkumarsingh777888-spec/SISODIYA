import { getAdminSummary, getCollection } from '../services/mockDataService.js';

export const getAdminDashboard = (req, res) => {
  res.json({
    summary: getAdminSummary(),
    users: getCollection('users'),
    vehicles: getCollection('vehicles'),
    mechanics: getCollection('mechanics'),
    serviceHistory: getCollection('serviceHistory'),
    emergencyRequests: getCollection('emergencyRequests'),
  });
};
