// SignUpPage.js

import React, { useState } from 'react';
import { signup } from '../Radux/actions/auth';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setisLoading] = useState(false)

  const dispatch = useDispatch()

  const handleSubmit = async(e) => {
    e.preventDefault();
    setisLoading(true)
    const userData = ({
        "name" : name,
        "username": username,
        "email" : email,
        "password" : password ,
        "role_id" : '2'
    })
    await dispatch(signup(userData))
    setName('')
    setUsername('')
    setEmail('')
    setPassword('')
    setisLoading(false)
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit">{isLoading ? 'Registering..' : 'Register'}</button>
        </div>
        <Link to='/login'>Already have an account?</Link>
      </form>
    </div>
  );
};

export default SignUpPage;
