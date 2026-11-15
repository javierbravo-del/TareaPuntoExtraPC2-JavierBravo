import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import api, { errorMessage } from '../api';
import { useAuth } from '../context/AuthContext';
import FlightTable from '../components/FlightTable';
import { addBookingId } from '../utils/bookingStorage';
import type { Flight } from '../types';

function SearchPage() {
  const [flightNumber, setFlightNumber] = useState('');
  const [airlineName, setAirlineName] = useState('');
  const [from, setFrom] = useState(''); 
  const [to, setTo] = useState('');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [newBookingId, setNewBookingId] = useState<number | null>(null);
  const { token, user } = useAuth();

  async function searchFlights() {
    setError('');
    try {
      const { data } = await api.get('/flights/search', {
        params: {
          flightNumber: flightNumber || undefined,
          airlineName: airlineName || undefined,
          estDepartureTimeFrom: from ? new Date(from).toISOString() : undefined,
          estDepartureTimeTo: to ? new Date(to).toISOString() : undefined,
        },
      });
      setFlights(data.items); 
    } catch (err) {
      setError(errorMessage(err));
    }
  }

  useEffect(() => {
    searchFlights();
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    searchFlights();
  }

  async function handleBook(flight: Flight) {
    setError('');
    setBookingMessage('');
    setNewBookingId(null);
    try {
      const { data } = await api.post('/flights/book', { flightId: flight.id });
      if (user) addBookingId(user.email, data.id); 
      setBookingMessage(`¡Reserva confirmada! ID de reserva: ${data.id} (vuelo ${flight.flightNumber})`);
      setNewBookingId(data.id);
      searchFlights(); 
    } catch (err) {
      setError(errorMessage(err));
    }
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Buscar vuelos</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
        <input placeholder="Número de vuelo (ej. LA101)" value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)} className="border p-2 rounded" />
        <input placeholder="Aerolínea (ej. LATAM)" value={airlineName}
          onChange={(e) => setAirlineName(e.target.value)} className="border p-2 rounded" />

        <label className="flex flex-col">
          Salida desde
          <input type="datetime-local" value={from}
            onChange={(e) => setFrom(e.target.value)} className="border p-2 rounded" />
        </label>
        <label className="flex flex-col">
          Salida hasta
          <input type="datetime-local" value={to}
            onChange={(e) => setTo(e.target.value)} className="border p-2 rounded" />
        </label>

        <button type="submit" className="col-span-2 bg-sky-600 text-white p-2 rounded hover:bg-sky-700">
          Buscar
        </button>
      </form>

      {!token && (
        <p className="mt-4 text-gray-700">
          <Link to="/login" className="text-sky-700 underline">Inicia sesión</Link> para poder reservar vuelos.
        </p>
      )}

      {error && <p className="mt-4 text-red-600">{error}</p>}
      {bookingMessage && (
        <p className="mt-4 text-green-700">
          {bookingMessage}{' '}
          {newBookingId && (
            <Link to={`/bookings/${newBookingId}`} className="underline">Ver detalle</Link>
          )}
        </p>
      )}

      <FlightTable flights={flights} canBook={!!token} onBook={handleBook} />
    </div>
  );
}

export default SearchPage;
