import { createDocument, deleteDocument, listDocuments } from '../services/firestoreService.js';

export const listServiceHistory = async (req, res, next) => {
  try {
    res.json(await listDocuments('serviceHistory'));
  } catch (error) {
    next(error);
  }
};

export const createServiceHistory = async (req, res, next) => {
  const { type, mechanic } = req.body;
  if (!type || !mechanic) {
    return res.status(400).json({ message: 'Service type and mechanic are required.' });
  }

  try {
    const record = await createDocument('serviceHistory', {
      ...req.body,
      cost: Number(req.body.cost || 0),
      date: req.body.date || new Date().toISOString().slice(0, 10),
    });
    return res.status(201).json(record);
  } catch (error) {
    return next(error);
  }
};

export const deleteServiceHistory = async (req, res, next) => {
  try {
    const deleted = await deleteDocument('serviceHistory', req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Service record not found.' });
    return res.json({ message: 'Service record deleted successfully.' });
  } catch (error) {
    return next(error);
  }
};
