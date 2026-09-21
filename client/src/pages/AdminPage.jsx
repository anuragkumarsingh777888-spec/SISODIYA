import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

function AdminPage() {
  const [dashboard, setDashboard] = useState({
    users: [],
    vehicles: [],
    mechanics: [],
    serviceHistory: [],
    emergencyRequests: [],
  });
  const [form, setForm] = useState({ name: '', shopName: '', rating: '4.5' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboard = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await api.getAdminDashboard();
      setDashboard(data);
    } catch (err) {
      setError(err.message || 'Admin dashboard failed to load.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleMechanicSubmit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.shopName) return;

    try {
      const created = await api.createMechanic({
        name: form.name,
        shopName: form.shopName,
        location: 'Local service center',
        phone: '+91 9999999999',
        services: ['Diagnostics'],
        rating: Number(form.rating || 4.5),
        isOpen: true,
      });

      setDashboard((prev) => ({ ...prev, mechanics: [created, ...prev.mechanics] }));
      setForm({ name: '', shopName: '', rating: '4.5' });
    } catch (err) {
      setError(err.message || 'Mechanic could not be added.');
    }
  };

  const handleDeleteMechanic = async (id) => {
    try {
      await api.deleteMechanic(id);
      setDashboard((prev) => ({ ...prev, mechanics: prev.mechanics.filter((mechanic) => mechanic.id !== id) }));
    } catch (err) {
      setError(err.message || 'Mechanic could not be deleted.');
    }
  };

  return (
    <Layout title="Admin Dashboard" showSidebar>
      {error && <div className="badge danger" style={{ marginBottom: '16px' }}>{error}</div>}
      {loading ? <p className="muted">Loading admin data...</p> : (
        <div className="grid-2">
          <div className="card table-card">
            <h3>Users</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.users.map((user) => (
                  <tr key={user.id || user.email}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card listing-card">
            <h3>Add mechanic</h3>
            <form className="form-grid" onSubmit={handleMechanicSubmit} style={{ marginTop: '18px' }}>
              <label className="field"><span>Name</span><input type="text" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
              <label className="field"><span>Shop</span><input type="text" value={form.shopName} onChange={(event) => setForm({ ...form, shopName: event.target.value })} /></label>
              <label className="field"><span>Rating</span><input type="number" step="0.1" value={form.rating} onChange={(event) => setForm({ ...form, rating: event.target.value })} /></label>
              <button type="submit" className="primary-btn">Add mechanic</button>
            </form>

            <table className="table" style={{ marginTop: '18px' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Shop</th>
                  <th>Rating</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.mechanics.map((item) => (
                  <tr key={item.id || item.name}>
                    <td>{item.name}</td>
                    <td>{item.shopName}</td>
                    <td>{item.rating}</td>
                    <td><button className="ghost-btn" onClick={() => handleDeleteMechanic(item.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default AdminPage;
