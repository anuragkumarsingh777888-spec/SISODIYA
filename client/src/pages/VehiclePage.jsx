import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

const emptyForm = {
  id: '',
  vehicleNumber: '',
  brand: '',
  model: '',
  year: '',
  fuelType: 'Petrol',
  lastServiceDate: '',
  nextServiceDate: '',
};

function VehiclePage() {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const loadVehicles = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await api.getVehicles();
      setVehicles(data);
    } catch (err) {
      setError(err.message || 'Unable to load vehicles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      const payload = {
        ...form,
        vehicleNumber: form.vehicleNumber,
        year: Number(form.year || new Date().getFullYear()),
      };

      if (form.id) {
        const updated = await api.updateVehicle(form.id, payload);
        setVehicles((prev) => prev.map((vehicle) => (vehicle.id === form.id ? updated : vehicle)));
      } else {
        const created = await api.createVehicle(payload);
        setVehicles((prev) => [created, ...prev]);
      }

      setForm(emptyForm);
    } catch (err) {
      setError(err.message || 'Vehicle could not be saved.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (vehicle) => {
    setForm({
      id: vehicle.id,
      vehicleNumber: vehicle.vehicleNumber || '',
      brand: vehicle.brand || '',
      model: vehicle.model || '',
      year: vehicle.year || '',
      fuelType: vehicle.fuelType || 'Petrol',
      lastServiceDate: vehicle.lastServiceDate || '',
      nextServiceDate: vehicle.nextServiceDate || '',
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteVehicle(id);
      setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id));
      if (form.id === id) setForm(emptyForm);
    } catch (err) {
      setError(err.message || 'Vehicle could not be deleted.');
    }
  };

  return (
    <Layout title="My Vehicle" showSidebar>
      <div className="grid-2">
        <div className="card listing-card">
          <div className="section-title">
            <h3>{form.id ? 'Edit vehicle' : 'Add vehicle'}</h3>
          </div>

          <form className="form-grid" onSubmit={handleSubmit} style={{ marginTop: '18px' }}>
            <label className="field"><span>Vehicle number</span><input type="text" name="vehicleNumber" value={form.vehicleNumber} onChange={handleChange} /></label>
            <label className="field"><span>Brand</span><input type="text" name="brand" value={form.brand} onChange={handleChange} /></label>
            <label className="field"><span>Model</span><input type="text" name="model" value={form.model} onChange={handleChange} /></label>
            <label className="field"><span>Manufacturing year</span><input type="number" name="year" value={form.year} onChange={handleChange} /></label>
            <label className="field"><span>Fuel type</span><select name="fuelType" value={form.fuelType} onChange={handleChange}><option>Petrol</option><option>Diesel</option><option>CNG</option><option>Electric</option></select></label>
            <label className="field"><span>Last service date</span><input type="date" name="lastServiceDate" value={form.lastServiceDate} onChange={handleChange} /></label>
            <label className="field"><span>Next service date</span><input type="date" name="nextServiceDate" value={form.nextServiceDate} onChange={handleChange} /></label>
            <button type="submit" className="primary-btn" disabled={saving}>{saving ? 'Saving...' : form.id ? 'Update vehicle' : 'Save vehicle'}</button>
            {error && <div className="badge danger" style={{ marginTop: '12px' }}>{error}</div>}
          </form>
        </div>

        <div className="card listing-card">
          <div className="section-title">
            <h3>Vehicle list</h3>
          </div>

          {loading ? <p className="muted" style={{ marginTop: '18px' }}>Loading vehicles...</p> : (
            <table className="table">
              <thead>
                <tr>
                  <th>Vehicle Number</th>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th>Fuel</th>
                  <th>Last Service</th>
                  <th>Next Service</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td>{vehicle.vehicleNumber}</td>
                    <td>{vehicle.brand}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.year}</td>
                    <td>{vehicle.fuelType}</td>
                    <td>{vehicle.lastServiceDate}</td>
                    <td>{vehicle.nextServiceDate}</td>
                    <td>
                      <button className="secondary-btn" onClick={() => handleEdit(vehicle)}>Edit</button>
                      <button className="ghost-btn" onClick={() => handleDelete(vehicle.id)} style={{ marginTop: '8px' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default VehiclePage;
