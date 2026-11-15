import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout(); 
    navigate('/login');
  }

  return (
    <nav className="bg-sky-700 text-white px-6 py-3 flex items-center justify-between">
      <Link to="/search" className="text-xl font-bold">
        ✈️ Fly Away
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/search" className="hover:underline">Buscar vuelos</Link>

        {token ? (
          <>
            <Link to="/my-bookings" className="hover:underline">Mis reservas</Link>
            {user && (
              <span className="font-semibold">
                Hola, {user.firstName} {user.lastName}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="bg-white text-sky-700 px-3 py-1 rounded hover:bg-sky-100"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="hover:underline">Registro</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
