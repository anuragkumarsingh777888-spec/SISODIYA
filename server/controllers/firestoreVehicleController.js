import {
  createDocument,
  deleteDocument,
  getDocument,
  listDocuments,
  updateDocument,
} from '../services/firestoreService.js';

const collection = 'vehicles';

export const listVehicles = async (req, res, next) => {
  try {
    res.json(await listDocuments(collection));
  } catch (error) {
    next(error);
  }
};

export const getVehicle = async (req, res, next) => {
  try {
    const vehicle = await getDocument(collection, req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found.' });
    return res.json(vehicle);
  } catch (error) {
    return next(error);
  }
};

export const createVehicle = async (req, res, next) => {
  const vehicleNumber = req.body.vehicleNumber || req.body.number;
  const { brand, model } = req.body;
  if (!vehicleNumber || !brand || !model) {
    return res.status(400).json({ message: 'Vehicle number, brand and model are required.' });
  }

  try {
    const vehicle = await createDocument(collection, {
      ...req.body,
      vehicleNumber,
      year: Number(req.body.year || new Date().getFullYear()),
    });
    return res.status(201).json(vehicle);
  } catch (error) {
    return next(error);
  }
};

export const updateVehicle = async (req, res, next) => {
  try {
    const vehicle = await updateDocument(collection, req.params.id, req.body);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found.' });
    return res.json(vehicle);
  } catch (error) {
    return next(error);
  }
};

export const deleteVehicle = async (req, res, next) => {
  try {
    const deleted = await deleteDocument(collection, req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Vehicle not found.' });
    return res.json({ message: 'Vehicle deleted successfully.' });
  } catch (error) {
    return next(error);
  }
};
