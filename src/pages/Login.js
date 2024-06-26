// Import necessary React modules
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { login } from '../Radux/actions/auth';
import { PasswordInput, Text, Group, Anchor } from '@mantine/core';


// Create a functional component for the login page
const LoginPage = (props) => {
  // State variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isloading, setisLoading] = useState(false)
  const navigate = useNavigate()

  const { login, loginData } = props
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the username is in email format
    const isEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
  
    const data = {
      // Use email key if the username is in email format, otherwise use username
      [isEmailFormat ? 'email' : 'username']: username,
      password: password,
    };
  
    setisLoading(true);
    await login(data);
  };
  
  console.log(isloading)

  useEffect(() => {
    localStorage.getItem('token') && 
    navigate('/')
  }, [localStorage.getItem('token')])

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Email or User Name</label>
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
          <Group justify="space-between" mb={5}>
            <Text component="label" htmlFor="your-password" size="sm" fw={500}>
              Your password
            </Text>

            <Anchor href="#" onClick={(event) => event.preventDefault()} pt={2} fw={500} fz="xs">
              Forgot your password?
            </Anchor>
          </Group>
          <div className="form-group">
            <PasswordInput style={{ height: '22px', fontSize: '22px' }} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Your password" id="your-password" />
          </div>
        </div>
        <div className="form-group">
          <button type="submit">{
            isloading ?
              <div style={{margin: '0 10px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="30" height="20">
                  <circle cx="50" cy="50" r="40" stroke="white" stroke-width="8" fill="none">
                    <animate attributeName="stroke-dasharray" values="0, 200; 90, 150; 140, 110; 200, 0" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="stroke-dashoffset" values="0, -20; -40, -60; -100, -120; -200, -220" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
              :
              'Login'
          }</button>
        </div>
        <Link style={{ textDecoration: 'underline', color: 'black' }} to='/signup'>Create a New Account</Link>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loginData: state
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

export default connect(mapStateToProps, mapDisPatchToProps)(LoginPage);
