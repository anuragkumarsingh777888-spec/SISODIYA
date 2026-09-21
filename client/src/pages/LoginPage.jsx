import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="auth-card card">
        <h2 style={{ marginBottom: '20px' }}>Welcome back</h2>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="name@example.com" />
          </label>

          <label className="field">
            <span>Password</span>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
          </label>

          {error && <div className="badge danger">{error}</div>}

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-center muted">
            Don’t have an account? <Link to="/signup">Create one</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default LoginPage;
