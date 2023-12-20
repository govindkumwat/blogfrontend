// Import necessary React modules
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { login } from '../Radux/actions/auth';

// Create a functional component for the login page
const LoginPage = (props) => {
  // State variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const {login, loginData} = props
  // Function to handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {
      email : username,
      password: password
    }
      await login(data)
  };

  console.log(loginData)


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
        <Link to='/signup'>Sign Up</Link>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
   loginData : state
  }
}

const mapDisPatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      login,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDisPatchToProps) (LoginPage);
