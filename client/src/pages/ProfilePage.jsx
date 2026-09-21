import Layout from '../components/Layout';

function ProfilePage() {
  return (
    <Layout title="Profile" showSidebar>
      <div className="card listing-card">
        <h3>Account overview</h3>
        <div className="form-grid" style={{ marginTop: '18px' }}>
          <label className="field">
            <span>Full name</span>
            <input type="text" value="Aarav Nair" readOnly />
          </label>
          <label className="field">
            <span>Email</span>
            <input type="email" value="aarav@example.com" readOnly />
          </label>
          <label className="field">
            <span>Phone</span>
            <input type="text" value="+91 9876543210" readOnly />
          </label>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;
