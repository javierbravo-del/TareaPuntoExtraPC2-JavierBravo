import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { errorMessage } from '../api';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); 
    setError('');
    setSuccess('');

    if (!email.trim() || !firstName.trim() || !lastName.trim() || !password.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      await api.post('/users/register', { email, firstName, lastName, password });
      setSuccess('¡Cuenta creada con éxito! Te llevamos al login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(errorMessage(err));
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Crear cuenta</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email}
          onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" />

        <label htmlFor="firstName">Nombre</label>
        <input id="firstName" value={firstName}
          onChange={(e) => setFirstName(e.target.value)} className="border p-2 rounded" />

        <label htmlFor="lastName">Apellido</label>
        <input id="lastName" value={lastName}
          onChange={(e) => setLastName(e.target.value)} className="border p-2 rounded" />

        <label htmlFor="password">Contraseña</label>
        <input id="password" type="password" value={password}
          onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded" />

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <button type="submit" className="bg-sky-600 text-white p-2 rounded hover:bg-sky-700">
          Registrarme
        </button>
      </form>

      <p className="mt-4 text-sm">
        ¿Ya tienes cuenta? <Link to="/login" className="text-sky-700 underline">Inicia sesión</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
