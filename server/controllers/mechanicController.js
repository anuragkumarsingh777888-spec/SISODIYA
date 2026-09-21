import { getCollection } from '../services/mockDataService.js';

export const getMechanics = (req, res) => {
  const mechanics = getCollection('mechanics');
  const { location, service, openOnly } = req.query;

  let filtered = [...mechanics];

  if (location) {
    filtered = filtered.filter((item) =>
      item.location.toLowerCase().includes(String(location).toLowerCase())
    );
  }

  if (service) {
    filtered = filtered.filter((item) =>
      item.services.some((entry) => entry.toLowerCase().includes(String(service).toLowerCase()))
    );
  }

  if (openOnly === 'true') {
    filtered = filtered.filter((item) => item.isOpen);
  }

  res.json(filtered);
};
