import {
  getCollection,
  addVehicle,
  updateItem,
  removeItem,
} from '../services/mockDataService.js';

export const getVehicles = (req, res) => {
  res.json(getCollection('vehicles'));
};

export const createVehicle = (req, res) => {
  const vehicleNumber = req.body.vehicleNumber || req.body.number;
  const { brand, model } = req.body;

  if (!vehicleNumber || !brand || !model) {
    return res.status(400).json({ message: 'Vehicle number, brand and model are required.' });
  }

  const vehicle = addVehicle({
    ...req.body,
    vehicleNumber,
  });
  return res.status(201).json(vehicle);
};

export const updateVehicle = (req, res) => {
  const { id } = req.params;
  const vehicle = updateItem('vehicles', id, req.body);

  if (!vehicle) {
    return res.status(404).json({ message: 'Vehicle not found.' });
  }

  return res.json(vehicle);
};

export const deleteVehicle = (req, res) => {
  const { id } = req.params;
  const removed = removeItem('vehicles', id);

  if (!removed) {
    return res.status(404).json({ message: 'Vehicle not found.' });
  }

  return res.json({ message: 'Vehicle deleted successfully.' });
};
