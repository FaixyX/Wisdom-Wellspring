import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import '../signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, username, password)
  };

  return (

    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">


      <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"/>
            </div>

        <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"/>
            </div>

        <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"/>
            </div>

        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={isLoading}>Signup</button>
      </form>
    </div>
  );
};

export default Signup;
