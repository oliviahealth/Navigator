import React, { useState } from 'react';
import styles from '../styles/LoginModal.module.css';
import Cookies from 'js-cookie';

const LoginModal = ({ showModal, setShowModal, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  ////////////////////////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Reset the error message
  
    fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Invalid username or password');
      }
      return response.json();
    })
    .then(data => {
      Cookies.set('accessToken', data.access_token, { expires: 30 });
      
      onLoginSuccess(); // Handle successful login
    })
    .catch((error) => {
      setError(error.message);
    });
  };
  ///////////////////////////////////////////////////////////////////////

  if (!showModal) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
        </form>
        <br></br>
        <button onClick={() => setShowModal(false)} className="closeButton">Close</button>
      </div>
    </div>
  );
};

export default LoginModal;
