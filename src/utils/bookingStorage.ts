
function keyFor(email: string): string {
  return `bookings:${email}`;
}

export function getBookingIds(email: string): number[] {
  return JSON.parse(localStorage.getItem(keyFor(email)) ?? '[]');
}

export function addBookingId(email: string, id: number): void {
  const ids = getBookingIds(email);
  localStorage.setItem(keyFor(email), JSON.stringify([...ids, id]));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('es-PE');
}
