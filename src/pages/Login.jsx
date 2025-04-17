import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../config/api';
import { authStyles } from '../styles/auth';
import { login } from '../services/auth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [focusedInput, setFocusedInput] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/api/auth/login', formData);
      login(response.data.token);
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
              style={{
                ...authStyles.input,
                ...(focusedInput === 'email' && authStyles.inputFocus),
              }}
              id='email'
              name='email'
              type='email'
              placeholder='seu@email.com'
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput('')}
              required
            />
          </div>

          <div style={authStyles.formGroup}>
            <label style={authStyles.label} htmlFor='password'>
              Senha
            </label>
            <input
              style={{
                ...authStyles.input,
                ...(focusedInput === 'password' && authStyles.inputFocus),
              }}
              id='password'
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput('')}
              required
            />
          </div>

          <button
            type='submit'
            style={authStyles.button}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = authStyles.buttonHover.backgroundColor || '')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = authStyles.button.backgroundColor || '')
            }
          >
            Entrar →
          </button>
        </form>

        <div style={authStyles.footer}>
          <span style={authStyles.footerText}>Não tem uma conta?</span>
          <Link
            to='/signup'
            style={authStyles.link}
            onMouseOver={(e) => {
              e.currentTarget.style.textDecoration =
                typeof authStyles.linkHover.textDecoration === 'string'
                  ? authStyles.linkHover.textDecoration
                  : 'none';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.textDecoration =
                typeof authStyles.link.textDecoration === 'string'
                  ? authStyles.link.textDecoration
                  : 'none';
            }}
          >
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
