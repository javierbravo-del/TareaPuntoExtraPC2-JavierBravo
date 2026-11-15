import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { errorMessage } from '../api';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Ingresa tu email y contraseña');
      return;
    }

    try {
      await login(email, password); 
      navigate('/search');          
    } catch (err) {
      setError(errorMessage(err));  
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email}
          onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" />

        <label htmlFor="password">Contraseña</label>
        <input id="password" type="password" value={password}
          onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded" />

        {error && <p className="text-red-600">{error}</p>}

        <button type="submit" className="bg-sky-600 text-white p-2 rounded hover:bg-sky-700">
          Entrar
        </button>
      </form>

      <p className="mt-4 text-sm">
        ¿No tienes cuenta? <Link to="/register" className="text-sky-700 underline">Regístrate</Link>
      </p>
    </div>
  );
}

export default LoginPage;
