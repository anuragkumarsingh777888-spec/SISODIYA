import { useState } from 'react';
import Layout from '../components/Layout';
import { api } from '../services/api';

const nearbyOptions = [
  { name: 'Roadside Rescue Team', distance: '2.1 km', type: 'Tow service' },
  { name: 'Night Shift Garage', distance: '3.5 km', type: 'Emergency repair' },
  { name: '24/7 Battery Support', distance: '4.8 km', type: 'Battery jump' },
];

function EmergencyPage() {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleEmergencyRequest = async () => {
    setError('');
    setStatus('Submitting emergency request...');

    try {
      const userLocation = { latitude: 28.6139, longitude: 77.2090 };
      const response = await api.submitEmergencyRequest({
        userId: 'user_1',
        location: `${userLocation.latitude}, ${userLocation.longitude}`,
        issue: 'Vehicle emergency assistance needed',
      });

      setStatus(`Request submitted successfully. Ref: ${response.request.id}`);
    } catch (err) {
      setError(err.message || 'Emergency request could not be submitted.');
      setStatus('');
    }
  };

  return (
    <Layout title="Emergency SOS" showSidebar>
      <div className="grid-2">
        <div className="card listing-card">
          <h3>Emergency assistance</h3>
          <p className="muted" style={{ marginTop: '10px' }}>Tap the button to confirm your emergency request. Location access will be used only for urgent assistance.</p>
          <button className="emergency-btn" style={{ marginTop: '20px' }} onClick={handleEmergencyRequest}>Request SOS</button>
          {status && <div className="badge success" style={{ marginTop: '16px' }}>{status}</div>}
          {error && <div className="badge danger" style={{ marginTop: '16px' }}>{error}</div>}
        </div>

        <div className="card listing-card">
          <h3>Nearby emergency options</h3>
          <ul style={{ listStyle: 'none', display: 'grid', gap: '12px', marginTop: '18px' }}>
            {nearbyOptions.map((item) => (
              <li key={item.name} className="card" style={{ padding: '16px' }}>
                <strong>{item.name}</strong>
                <p className="muted">{item.type}</p>
                <p>{item.distance}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default EmergencyPage;
