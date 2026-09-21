import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const features = [
  { title: 'Smart Vehicle Tracking', text: 'Track service dates, upcoming maintenance, and vehicle health in one dashboard.' },
  { title: 'Quick Mechanic Access', text: 'Find trusted nearby mechanics with live availability and rating filters.' },
  { title: 'Emergency SOS', text: 'Request emergency help instantly with location-aware assistance and service options.' },
  { title: 'AI Diagnosis', text: 'Get fast rule-based diagnostics for common vehicle problems and next steps.' },
];

function LandingPage() {
  return (
    <Layout>
      <section className="hero">
        <div className="hero-grid">
          <div>
            <h1>Keep your vehicle safe, smart, and road-ready.</h1>
            <p>
              MechConnect helps vehicle owners manage service records, find the right mechanic,
              diagnose common issues, and access emergency support in seconds.
            </p>

            <div className="hero-actions">
              <Link to="/signup" className="primary-btn">Get Started</Link>
              <Link to="/dashboard" className="secondary-btn">View Demo</Link>
            </div>
          </div>

          <div className="hero-card card">
            <h3>Vehicle Health Snapshot</h3>
            <div className="metrics">
              <div className="metric">
                <strong>92%</strong>
                <span>Health score</span>
              </div>
              <div className="metric">
                <strong>14</strong>
                <span>Days to service</span>
              </div>
              <div className="metric">
                <strong>3</strong>
                <span>Open alerts</span>
              </div>
              <div className="metric">
                <strong>4.8</strong>
                <span>Avg. rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page">
        <div className="section-title">
          <h2>Why MechConnect?</h2>
        </div>

        <div className="grid-3">
          {features.map((feature) => (
            <div key={feature.title} className="card listing-card">
              <h3>{feature.title}</h3>
              <p className="muted" style={{ marginTop: '10px', lineHeight: 1.7 }}>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default LandingPage;
