import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import MyBookingsPage from './pages/MyBookingsPage';
import BookingDetailPage from './pages/BookingDetailPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/search" />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchPage />} />

          {/* Rutas protegidas: sin token te mandan al login */}
          <Route
            path="/my-bookings"
            element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>}
          />
          <Route
            path="/bookings/:id"
            element={<ProtectedRoute><BookingDetailPage /></ProtectedRoute>}
          />

          <Route path="*" element={<h1 className="text-center mt-10 text-2xl">404 - Página no encontrada</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
