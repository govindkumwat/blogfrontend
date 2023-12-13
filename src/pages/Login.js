// Import necessary React modules
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

// Create a functional component for the login page
const LoginPage = () => {
  // State variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
   axios.post(`http://localhost:3001/login`, {
    email: username,
    password: password
   }).then((res) => 
   {
    if(res?.user) {
        alert('hello')
        localStorage.setItem('token', res.token);
        navigate('/')
    } else {
        alert('Invalid username or password')
    }
   })
  };


  useEffect(() => {
    localStorage.getItem('token') && 
    navigate('/')
  } ,[localStorage.getItem('token')])

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
