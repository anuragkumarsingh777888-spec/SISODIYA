import {
  users,
  vehicleData,
  mechanicData,
  serviceHistory,
  emergencyRequests,
  reminders,
} from '../data/mockData.js';

const state = {
  users: structuredClone(users),
  vehicles: structuredClone(vehicleData),
  mechanics: structuredClone(mechanicData),
  serviceHistory: structuredClone(serviceHistory),
  emergencyRequests: structuredClone(emergencyRequests),
  reminders: structuredClone(reminders),
};

const cloneList = (items = []) => items.map((item) => ({ ...item }));

export const getCollection = (collectionName) => cloneList(state[collectionName] || []);

export const addItem = (collectionName, item) => {
  state[collectionName] = [...(state[collectionName] || []), item];
  return item;
};

export const updateItem = (collectionName, id, updatedItem) => {
  const currentList = state[collectionName] || [];
  const index = currentList.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const merged = { ...currentList[index], ...updatedItem };
  state[collectionName][index] = merged;
  return merged;
};

export const removeItem = (collectionName, id) => {
  const currentList = state[collectionName] || [];
  const item = currentList.find((entry) => entry.id === id);
  state[collectionName] = currentList.filter((entry) => entry.id !== id);
  return item;
};

export const createId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;

export const getAdminSummary = () => ({
  userCount: state.users.length,
  vehicleCount: state.vehicles.length,
  mechanicCount: state.mechanics.length,
  emergencyCount: state.emergencyRequests.length,
  serviceCount: state.serviceHistory.length,
});

export const addEmergencyRequest = ({ userId, location, issue }) => {
  const request = {
    id: createId('e'),
    userId,
    status: 'Pending',
    location,
    issue: issue || 'Emergency assistance requested',
    requestedAt: new Date().toISOString(),
  };

  addItem('emergencyRequests', request);
  return request;
};

export const addVehicle = (vehicleDataInput) => {
  const vehicle = {
    id: vehicleDataInput.id || createId('veh'),
    ...vehicleDataInput,
    year: Number(vehicleDataInput.year || new Date().getFullYear()),
  };

  addItem('vehicles', vehicle);
  return vehicle;
};

export const addServiceHistory = (entry) => {
  const serviceEntry = {
    id: entry.id || createId('s'),
    ...entry,
    cost: Number(entry.cost || 0),
    date: entry.date || new Date().toISOString().slice(0, 10),
  };

  addItem('serviceHistory', serviceEntry);
  return serviceEntry;
};
