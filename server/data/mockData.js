export const vehicleData = [
  {
    id: 'veh_1',
    userId: 'user_1',
    vehicleNumber: 'DL 01 AB 1234',
    brand: 'Hyundai',
    model: 'Creta',
    year: 2022,
    fuelType: 'Petrol',
    lastServiceDate: '2025-05-14',
    nextServiceDate: '2025-11-14',
  },
];

export const mechanicData = [
  {
    id: 'm_1',
    name: 'Rohit Sharma',
    shopName: 'AutoCare Pro',
    location: 'Dwarka, Delhi',
    phone: '+91 9876543210',
    services: ['Engine Repair', 'AC Service', 'Diagnostics'],
    rating: 4.8,
    isOpen: true,
  },
  {
    id: 'm_2',
    name: 'Anil Verma',
    shopName: 'RoadReady Garage',
    location: 'Saket, Delhi',
    phone: '+91 9988776655',
    services: ['Brake Service', 'Battery', 'Tire Care'],
    rating: 4.6,
    isOpen: false,
  },
  {
    id: 'm_3',
    name: 'Nitin Gupta',
    shopName: 'SwiftFix Motors',
    location: 'Janakpuri, Delhi',
    phone: '+91 9123456780',
    services: ['Suspension', 'Electrical', 'Car Wash'],
    rating: 4.9,
    isOpen: true,
  },
];

export const serviceHistory = [
  {
    id: 's_1',
    date: '2025-06-02',
    type: 'Oil Change',
    cost: 3200,
    mechanic: 'AutoCare Pro',
    description: 'Routine engine oil and filter replacement.',
  },
  {
    id: 's_2',
    date: '2025-08-12',
    type: 'Brake Check',
    cost: 1800,
    mechanic: 'RoadReady Garage',
    description: 'Front brake pads inspected and cleaned.',
  },
];

export const emergencyRequests = [
  {
    id: 'e_1',
    userId: 'user_1',
    status: 'Pending',
    location: 'Dwarka Sector 7',
    requestedAt: '2025-09-15T10:15:00Z',
    issue: 'Car won’t start',
  },
];

export const reminders = [
  {
    id: 'r_1',
    title: 'Next service due',
    date: '2025-11-14',
    reminder: 'Book service for engine inspection',
  },
];

export const users = [
  {
    id: 'user_1',
    name: 'Aarav Nair',
    email: 'aarav@example.com',
    role: 'user',
  },
  {
    id: 'admin_1',
    name: 'Admin Team',
    email: 'admin@mechconnect.com',
    role: 'admin',
  },
];
