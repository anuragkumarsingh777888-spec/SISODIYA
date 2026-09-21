const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '');

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof payload === 'string' ? payload : payload.message || 'Request failed.';
    throw new Error(message);
  }

  return payload;
}

export const api = {
  healthCheck: () => request('/health'),
  login: (payload) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  signup: (payload) => request('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  getUsers: () => request('/users'),
  getVehicles: () => request('/vehicles'),
  createVehicle: (payload) => request('/vehicles', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  updateVehicle: (id, payload) => request(`/vehicles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  }),
  deleteVehicle: (id) => request(`/vehicles/${id}`, { method: 'DELETE' }),
  getMechanics: (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') query.append(key, String(value));
    });

    const suffix = query.toString() ? `?${query.toString()}` : '';
    return request(`/mechanics${suffix}`);
  },
  createMechanic: (payload) => request('/mechanics', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  deleteMechanic: (id) => request(`/mechanics/${id}`, { method: 'DELETE' }),
  getServiceHistory: () => request('/service-history'),
  createServiceRecord: (payload) => request('/service-history', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  getEmergencyRequests: () => request('/emergency-requests'),
  submitEmergencyRequest: (payload) => request('/emergency-sos', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  getReminders: () => request('/reminders'),
  createReminder: (payload) => request('/reminders', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  diagnoseIssue: (payload) => request('/diagnosis', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  getAdminDashboard: () => request('/admin/dashboard'),
};

export default api;
