import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

function ServiceHistoryPage() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ date: '', type: '', cost: '', mechanic: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadRecords = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await api.getServiceHistory();
        setRecords(data);
      } catch (err) {
        setError(err.message || 'Unable to load service records.');
      } finally {
        setLoading(false);
      }
    };

    loadRecords();
  }, []);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      const newRecord = await api.createServiceRecord({
        date: form.date,
        type: form.type,
        cost: Number(form.cost || 0),
        mechanic: form.mechanic,
        description: form.description,
      });

      setRecords((prev) => [newRecord, ...prev]);
      setForm({ date: '', type: '', cost: '', mechanic: '', description: '' });
    } catch (err) {
      setError(err.message || 'Service record could not be saved.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout title="Service History" showSidebar>
      <div className="grid-2">
        <div className="card listing-card">
          <h3>Add service record</h3>
          <form className="form-grid" onSubmit={handleSubmit} style={{ marginTop: '18px' }}>
            <label className="field"><span>Date</span><input type="date" name="date" value={form.date} onChange={handleChange} /></label>
            <label className="field"><span>Service type</span><input type="text" name="type" value={form.type} onChange={handleChange} /></label>
            <label className="field"><span>Cost</span><input type="number" name="cost" value={form.cost} onChange={handleChange} /></label>
            <label className="field"><span>Mechanic</span><input type="text" name="mechanic" value={form.mechanic} onChange={handleChange} /></label>
            <label className="field"><span>Description</span><textarea name="description" value={form.description} onChange={handleChange} /></label>
            <button type="submit" className="primary-btn" disabled={saving}>{saving ? 'Saving...' : 'Save service'}</button>
            {error && <div className="badge danger" style={{ marginTop: '12px' }}>{error}</div>}
          </form>
        </div>

        <div className="card table-card">
          <div className="section-title">
            <h3>Maintenance timeline</h3>
          </div>

          {loading ? <p className="muted" style={{ marginTop: '18px' }}>Loading service records...</p> : (
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Service Type</th>
                  <th>Cost</th>
                  <th>Mechanic</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id || `${record.date}-${record.type}`}>
                    <td>{record.date}</td>
                    <td>{record.type}</td>
                    <td>₹{Number(record.cost || 0).toLocaleString('en-IN')}</td>
                    <td>{record.mechanic}</td>
                    <td>{record.description}</td>
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

export default ServiceHistoryPage;
