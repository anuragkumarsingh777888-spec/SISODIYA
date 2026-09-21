import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Layout({ children, title, showSidebar = false }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <header className="navbar">
        <div className="container navbar-inner">
          <Link to="/" className="logo">
            <span className="logo-mark">M</span>
            <span>MechConnect</span>
          </Link>

          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/mechanics">Mechanics</Link>
            <Link to="/diagnosis">AI Diagnosis</Link>
            <Link to="/emergency">Emergency</Link>
            <Link to="/admin">Admin</Link>
          </nav>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {user ? (
              <>
                <span className="muted">Hi, {user.name}</span>
                <button className="ghost-btn" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link to="/login" className="secondary-btn">Login</Link>
            )}
          </div>
        </div>
      </header>

      {showSidebar ? (
        <div className="container page">
          <div className="dashboard-layout">
            <aside className="sidebar">
              <div className="logo">
                <span className="logo-mark">M</span>
                <span>MechConnect</span>
              </div>

              <nav className="sidebar-nav">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/vehicles">My Vehicle</Link>
                <Link to="/mechanics">Find Mechanics</Link>
                <Link to="/diagnosis">AI Diagnosis</Link>
                <Link to="/service-history">Service History</Link>
                <Link to="/emergency">Emergency SOS</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/admin">Admin Panel</Link>
              </nav>
            </aside>

            <main className="content">
              <div className="section-title">
                <h2>{title}</h2>
                <button className="primary-btn">+ New Action</button>
              </div>
              {children}
            </main>
          </div>
        </div>
      ) : (
        <div className="container">{children}</div>
      )}
    </div>
  );
}

export default Layout;
