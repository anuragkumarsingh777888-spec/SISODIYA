import {
  getCollection,
  addServiceHistory,
  updateItem,
  removeItem,
} from '../services/mockDataService.js';

export const getServiceHistory = (req, res) => {
  res.json(getCollection('serviceHistory'));
};

export const createServiceHistory = (req, res) => {
  const { type, mechanic, cost } = req.body;

  if (!type || !mechanic) {
    return res.status(400).json({ message: 'Service type and mechanic are required.' });
  }

  const entry = addServiceHistory(req.body);
  return res.status(201).json(entry);
};

export const updateServiceHistory = (req, res) => {
  const { id } = req.params;
  const entry = updateItem('serviceHistory', id, req.body);

  if (!entry) {
    return res.status(404).json({ message: 'Service record not found.' });
  }

  return res.json(entry);
};

export const deleteServiceHistory = (req, res) => {
  const { id } = req.params;
  const deleted = removeItem('serviceHistory', id);

  if (!deleted) {
    return res.status(404).json({ message: 'Service record not found.' });
  }

  return res.json({ message: 'Service record deleted successfully.' });
};
