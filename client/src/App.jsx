import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import VehiclePage from './pages/VehiclePage';
import MechanicsPage from './pages/MechanicsPage';
import DiagnosisPage from './pages/DiagnosisPage';
import ServiceHistoryPage from './pages/ServiceHistoryPage';
import EmergencyPage from './pages/EmergencyPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/vehicles" element={<ProtectedRoute><VehiclePage /></ProtectedRoute>} />
      <Route path="/mechanics" element={<ProtectedRoute><MechanicsPage /></ProtectedRoute>} />
      <Route path="/diagnosis" element={<ProtectedRoute><DiagnosisPage /></ProtectedRoute>} />
      <Route path="/service-history" element={<ProtectedRoute><ServiceHistoryPage /></ProtectedRoute>} />
      <Route path="/emergency" element={<ProtectedRoute><EmergencyPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
