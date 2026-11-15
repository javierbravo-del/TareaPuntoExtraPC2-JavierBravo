import type { Flight } from '../types';
import { formatDate } from '../utils/bookingStorage';

interface FlightTableProps {
  flights: Flight[];
  canBook: boolean;
  onBook: (flight: Flight) => void;
}

function FlightTable({ flights, canBook, onBook }: FlightTableProps) {
  if (flights.length === 0) {
    return (
      <p className="text-center text-gray-600 mt-6">
        No encontramos vuelos con esos filtros 😕 Prueba con otra búsqueda.
      </p>
    );
  }

  return (
    <table className="w-full mt-6 border border-gray-300">
      <thead className="bg-sky-100">
        <tr>
          <th className="p-2 text-left">Número</th>
          <th className="p-2 text-left">Aerolínea</th>
          <th className="p-2 text-left">Salida</th>
          <th className="p-2 text-left">Llegada</th>
          <th className="p-2 text-left">Asientos</th>
          {canBook && <th className="p-2"></th>}
        </tr>
      </thead>
      <tbody>
        {flights.map((flight) => (
          <tr key={flight.id} className="border-t border-gray-200">
            <td className="p-2">{flight.flightNumber}</td>
            <td className="p-2">{flight.airlineName}</td>
            <td className="p-2">{formatDate(flight.estDepartureTime)}</td>
            <td className="p-2">{formatDate(flight.estArrivalTime)}</td>
            <td className="p-2">{flight.availableSeats}</td>
            {canBook && (
              <td className="p-2">
                <button
                  onClick={() => onBook(flight)}
                  className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700"
                >
                  Reservar
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FlightTable;
