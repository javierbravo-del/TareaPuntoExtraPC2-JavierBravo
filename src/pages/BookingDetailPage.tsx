import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api, { errorMessage } from '../api';
import { formatDate } from '../utils/bookingStorage';
import type { Booking } from '../types';

function BookingDetailPage() {
  const { id } = useParams(); 
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<Booking>(`/flights/book/${id}`)
      .then((res) => setBooking(res.data))
      .catch((err) => setError(errorMessage(err)));
  }, [id]);

  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!booking) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Reserva #{booking.id}</h1>
      <ul className="flex flex-col gap-1">
        <li><b>Vuelo:</b> {booking.flightNumber}</li>
        <li><b>Aerolínea:</b> {booking.airlineName}</li>
        <li><b>Salida:</b> {formatDate(booking.estDepartureTime)}</li>
        <li><b>Llegada:</b> {formatDate(booking.estArrivalTime)}</li>
        <li><b>Pasajero:</b> {booking.customerFirstName} {booking.customerLastName}</li>
        <li><b>Fecha de reserva:</b> {formatDate(booking.bookingDate)}</li>
      </ul>
      <Link to="/my-bookings" className="inline-block mt-4 text-sky-700 underline">
        ← Volver a mis reservas
      </Link>
    </div>
  );
}

export default BookingDetailPage;
