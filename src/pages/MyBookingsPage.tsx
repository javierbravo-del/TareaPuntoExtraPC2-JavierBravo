import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { formatDate, getBookingIds } from '../utils/bookingStorage';
import type { Booking } from '../types';

function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return; 

    const ids = getBookingIds(user.email);
    Promise.allSettled(ids.map((id) => api.get<Booking>(`/flights/book/${id}`))).then((results) => {
      const found: Booking[] = [];
      results.forEach((r) => {
        if (r.status === 'fulfilled') found.push(r.value.data);
      });
      setBookings(found);
      setLoading(false);
    });
  }, [user]);

  if (loading) return <p className="text-center mt-10">Cargando reservas...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Mis reservas</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-600">
          Aún no tienes reservas. <Link to="/search" className="text-sky-700 underline">Busca un vuelo</Link>
        </p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-sky-100">
            <tr>
              <th className="p-2 text-left">ID reserva</th>
              <th className="p-2 text-left">Vuelo</th>
              <th className="p-2 text-left">Aerolínea</th>
              <th className="p-2 text-left">Salida</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t border-gray-200">
                <td className="p-2">{b.id}</td>
                <td className="p-2">{b.flightNumber}</td>
                <td className="p-2">{b.airlineName}</td>
                <td className="p-2">{formatDate(b.estDepartureTime)}</td>
                <td className="p-2">
                  <Link to={`/bookings/${b.id}`} className="text-sky-700 underline">Ver detalle</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyBookingsPage;
