import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

const symptoms = ['Engine making noise', 'Vehicle not starting', 'Brake problem', 'Battery problem', 'Low mileage', 'Overheating'];

function DiagnosisPage() {
  const [selectedSymptom, setSelectedSymptom] = useState('Engine making noise');
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const runDiagnosis = async () => {
      setLoading(true);
      setError('');

      try {
        const result = await api.diagnoseIssue({ symptom: selectedSymptom });
        setDiagnosis(result);
      } catch (err) {
        setError(err.message || 'Diagnosis failed.');
      } finally {
        setLoading(false);
      }
    };

    runDiagnosis();
  }, [selectedSymptom]);

  return (
    <Layout title="AI Diagnosis" showSidebar>
      <div className="grid-2">
        <div className="card listing-card">
          <h3>Select a symptom</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '18px' }}>
            {symptoms.map((symptom) => (
              <button
                key={symptom}
                className={selectedSymptom === symptom ? 'primary-btn' : 'secondary-btn'}
                onClick={() => setSelectedSymptom(symptom)}
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>

        <div className="card listing-card">
          <h3>Diagnosis result</h3>
          {loading && <p className="muted" style={{ marginTop: '18px' }}>Analyzing...</p>}
          {error && <div className="badge danger" style={{ marginTop: '18px' }}>{error}</div>}
          {diagnosis && (
            <ul style={{ listStyle: 'none', display: 'grid', gap: '10px', marginTop: '18px' }}>
              <li><strong>Possible cause:</strong> {diagnosis.possibleCause}</li>
              <li><strong>Severity:</strong> {diagnosis.severity}</li>
              <li><strong>Recommended action:</strong> {diagnosis.recommendedAction}</li>
              <li><strong>Mechanic recommended:</strong> {diagnosis.mechanicRecommended ? 'Yes' : 'No'}</li>
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default DiagnosisPage;
