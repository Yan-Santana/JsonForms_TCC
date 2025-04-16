import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../config/api';
import { authStyles } from '../styles/auth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('http://localhost:3001/api/auth/login', formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao fazer login');
    }
  };

  return (
    <div style={authStyles.container}>
      <div style={authStyles.formContainer}>
        <div style={authStyles.header}>
          <h1 style={authStyles.title}>Entrar</h1>
          <p style={authStyles.subtitle}>Digite suas credenciais para acessar sua conta</p>
        </div>

        {error && <div style={authStyles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={authStyles.formGroup}>
            <label style={authStyles.label} htmlFor='email'>
              Email
            </label>
            <input
              style={authStyles.input}
              id='email'
              name='email'
              type='email'
              placeholder='seu@email.com'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={authStyles.formGroup}>
            <label style={authStyles.label} htmlFor='password'>
              Senha
            </label>
            <input
              style={authStyles.input}
              id='password'
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type='submit'
            style={authStyles.button}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = authStyles.buttonHover.backgroundColor)
            }
            onMouseOut={(e) => (e.target.style.backgroundColor = authStyles.button.backgroundColor)}
          >
            Entrar →
          </button>
        </form>

        <div style={authStyles.footer}>
          <span style={authStyles.footerText}>Não tem uma conta?</span>
          <Link to='/signup' style={authStyles.link}>
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
