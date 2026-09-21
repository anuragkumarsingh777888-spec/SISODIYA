import {
  getCollection,
  addEmergencyRequest,
  updateItem,
} from '../services/mockDataService.js';

export const getEmergencyRequests = (req, res) => {
  res.json(getCollection('emergencyRequests'));
};

export const submitEmergencyRequest = (req, res) => {
  const { userId, location, issue } = req.body;

  if (!userId || !location) {
    return res.status(400).json({ message: 'User ID and location are required.' });
  }

  const request = addEmergencyRequest({ userId, location, issue });
  return res.status(201).json({ message: 'Emergency request received.', request });
};

export const updateEmergencyRequest = (req, res) => {
  const { id } = req.params;
  const updated = updateItem('emergencyRequests', id, req.body);

  if (!updated) {
    return res.status(404).json({ message: 'Emergency request not found.' });
  }

  return res.json(updated);
};
