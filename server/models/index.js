export const userModel = {
  id: 'string',
  name: 'string',
  email: 'string',
  role: 'user | admin',
};

export const vehicleModel = {
  id: 'string',
  userId: 'string',
  vehicleNumber: 'string',
  brand: 'string',
  model: 'string',
  year: 'number',
  fuelType: 'string',
  lastServiceDate: 'YYYY-MM-DD',
  nextServiceDate: 'YYYY-MM-DD',
};

export const mechanicModel = {
  id: 'string',
  name: 'string',
  shopName: 'string',
  location: 'string',
  phone: 'string',
  services: ['string'],
  rating: 'number',
  isOpen: 'boolean',
};
