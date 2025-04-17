import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../config/api';
import { authStyles } from '../styles/auth';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    group: 'Grupo A',
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

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      await api.post('/api/auth/register', formData);
      alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao criar usuário');
    }
  };

  return (
    <div style={authStyles.container}>
      <div style={authStyles.formContainer}>
        <div style={authStyles.header}>
          <h1 style={authStyles.title}>Criar conta</h1>
          <p style={authStyles.subtitle}>Preencha os dados abaixo para criar sua conta</p>
        </div>

        {error && <div style={authStyles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={authStyles.formGroup}>
            <label style={authStyles.label} htmlFor='firstName'>
              Nome
            </label>
            <input
              style={authStyles.input}
              id='firstName'
              name='firstName'
              placeholder='Seu nome'
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div style={authStyles.formGroup}>
            <label style={authStyles.label} htmlFor='lastName'>
              Sobrenome
            </label>
            <input
              style={authStyles.input}
              id='lastName'
              name='lastName'
              placeholder='Seu sobrenome'
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

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

          <div style={authStyles.formGroup}>
            <label style={authStyles.label} htmlFor='confirmPassword'>
              Confirmar Senha
            </label>
            <input
              style={authStyles.input}
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div style={authStyles.formGroup}>
            <label style={authStyles.label} htmlFor='group'>
              Grupo
            </label>
            <select
              style={authStyles.input}
              id='group'
              name='group'
              value={formData.group}
              onChange={handleChange}
              required
            >
              <option value='Grupo A'>Grupo A</option>
              <option value='Grupo B'>Grupo B</option>
            </select>
          </div>

          <button
            type='submit'
            style={authStyles.button}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = authStyles.buttonHover.backgroundColor)
            }
            onMouseOut={(e) => (e.target.style.backgroundColor = authStyles.button.backgroundColor)}
          >
            Cadastrar →
          </button>
        </form>

        <div style={authStyles.footer}>
          <span style={authStyles.footerText}>Já tem uma conta?</span>
          <Link to='/login' style={authStyles.link}>
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
