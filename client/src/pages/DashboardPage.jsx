import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

function DashboardPage() {
  const [summary, setSummary] = useState({
    vehicles: [],
    serviceHistory: [],
    reminders: [],
    emergencyRequests: [],
    mechanics: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      setError('');

      try {
        const [vehicles, serviceHistory, reminders, emergencyRequests, mechanics] = await Promise.all([
          api.getVehicles(),
          api.getServiceHistory(),
          api.getReminders(),
          api.getEmergencyRequests(),
          api.getMechanics(),
        ]);

        setSummary({ vehicles, serviceHistory, reminders, emergencyRequests, mechanics });
      } catch (err) {
        setError(err.message || 'Dashboard data could not be loaded.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const stats = [
    { label: 'Vehicle health', value: `${Math.max(70, Math.min(99, summary.vehicles.length * 20 + 70))}%` },
    { label: 'Next service', value: summary.reminders[0] ? summary.reminders[0].date : 'No date' },
    { label: 'Emergency requests', value: String(summary.emergencyRequests.length) },
    { label: 'Saved mechanics', value: String(summary.mechanics.length) },
  ];

  const upcomingService = summary.reminders[0] || { title: 'No upcoming reminder', date: 'N/A' };

  return (
    <Layout title="Dashboard" showSidebar>
      {error && <div className="badge danger" style={{ marginBottom: '16px' }}>{error}</div>}
      {loading ? (
        <p className="muted">Loading dashboard data...</p>
      ) : (
        <>
          <div className="grid-3">
            {stats.map((item) => (
              <div key={item.label} className="stat-card card">
                <h3>{item.label}</h3>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="grid-2">
            <div className="card listing-card">
              <h3>Upcoming service</h3>
              <p style={{ marginTop: '10px' }}><strong>{upcomingService.title}</strong></p>
              <p className="muted">Next service due: {upcomingService.date}</p>
              <button className="primary-btn" style={{ marginTop: '16px' }}>Book Service</button>
            </div>

            <div className="card listing-card">
              <h3>Emergency SOS</h3>
              <p className="muted" style={{ marginTop: '10px' }}>Need emergency support? Get nearby mechanic and roadside help instantly.</p>
              <button className="emergency-btn" style={{ marginTop: '18px' }}>Emergency SOS</button>
            </div>
          </div>

          <div className="card table-card">
            <h3>Recent service history</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {summary.serviceHistory.slice(0, 4).map((item) => (
                  <tr key={item.id || `${item.date}-${item.type}`}>
                    <td>{item.type}</td>
                    <td>{item.date}</td>
                    <td>₹{Number(item.cost || 0).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Layout>
  );
}

export default DashboardPage;
