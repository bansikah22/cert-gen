import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';

const API_URL = process.env.REACT_APP_API_URL;

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData);
      console.log(response.data);
      onLogin({ name: formData.username });
      navigate('/');
    } catch (error) {
      console.error('Login failed', error.response?.data);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className={styles.formLink}>
        Don't have an account? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
};

export default Login;