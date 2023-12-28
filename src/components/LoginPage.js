import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import Header from './Header';
import { Link } from 'react-router-dom';
import users from '../database/users.json';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const loginHandler = (e) => {
    e.preventDefault();

    const user = users.find((user) => user.email === email);

    if (user) {
      if (user.password === password) {
        localStorage.setItem('token', user.id);
        setMessage('Login successful!');
        // Redirect the user to the home page
        navigate('/');
      } else {
        setMessage('Mot de passe incorrect');
      }
    } else {
      setMessage('Email non trouvé');
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center mt-32">
        <Link to="/RegisterPage" className="text-3xl mb-4 hover:text-gray-300">
          Register by email
        </Link>
        <div className="flex flex-row items-center justify-center">Or Login with credentials</div>
        {message && <div className="text-red-500">{message}</div>}
        <form className="formsLogin mt-5 max-w-md w-96" onSubmit={loginHandler}>
          {/* Email */}
          <div className="flex flex-col mb-4">
            <label className="mb-1">E-mail</label>
            <input
              type="text"
              className="border-2 border-black py-2 rounded-md w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password */}
          <div className="flex flex-col mb-4">
            <label className="mb-1">Password</label>
            <input
              type="password"
              className="border-2 border-black py-2 rounded-md w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-black text-white p-2 rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
