import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

function SignupPage() {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await signup(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="auth-card card">
        <h2 style={{ marginBottom: '20px' }}>Create your account</h2>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="field">
            <span>Full Name</span>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
          </label>

          <label className="field">
            <span>Email</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="name@example.com" />
          </label>

          <label className="field">
            <span>Password</span>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Create a password" />
          </label>

          {error && <div className="badge danger">{error}</div>}

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>

          <p className="text-center muted">
            Already registered? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default SignupPage;
