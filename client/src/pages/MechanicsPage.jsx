import { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

function MechanicsPage() {
  const [mechanics, setMechanics] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMechanics = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await api.getMechanics();
        setMechanics(data);
      } catch (err) {
        setError(err.message || 'Unable to load mechanics.');
      } finally {
        setLoading(false);
      }
    };

    loadMechanics();
  }, []);

  const filteredMechanics = useMemo(() => {
    return mechanics.filter((mechanic) => {
      const searchableText = `${mechanic.name} ${mechanic.location} ${(mechanic.services || []).join(' ')}`.toLowerCase();
      const matchesSearch = searchableText.includes(search.toLowerCase());
      const status = mechanic.isOpen ? 'Open' : 'Closed';
      const matchesFilter = filter === 'All' || status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [mechanics, search, filter]);

  return (
    <Layout title="Find Mechanics" showSidebar>
      <div className="card listing-card">
        <div className="section-title">
          <h3>Available mechanics</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by location or service"
              style={{ width: '260px', padding: '10px 12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}
            />
            <select value={filter} onChange={(event) => setFilter(event.target.value)} style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <option>All</option>
              <option>Open</option>
              <option>Closed</option>
            </select>
          </div>
        </div>

        {loading && <p className="muted" style={{ marginTop: '18px' }}>Loading mechanics...</p>}
        {error && <div className="badge danger" style={{ marginTop: '18px' }}>{error}</div>}

        <div className="grid-3" style={{ marginTop: '18px' }}>
          {filteredMechanics.map((mechanic) => {
            const status = mechanic.isOpen ? 'Open' : 'Closed';
            return (
              <div key={mechanic.id || mechanic.name} className="card listing-card">
                <h3>{mechanic.name}</h3>
                <p className="muted">{mechanic.shopName}</p>
                <p style={{ marginTop: '10px' }}>Location: {mechanic.location}</p>
                <p>Services: {(mechanic.services || []).join(', ')}</p>
                <p>Rating: {mechanic.rating} ★</p>
                <span className={`badge ${status === 'Open' ? 'success' : 'danger'}`} style={{ marginTop: '12px' }}>{status}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default MechanicsPage;
