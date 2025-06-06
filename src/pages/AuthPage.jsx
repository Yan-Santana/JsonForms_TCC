import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';
import { login } from '../services/auth';
import { Alert } from '../components/Alert';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    group: 'Grupo A',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setErrors(['As senhas não coincidem']);
      return;
    }

    try {
      if (isLogin) {
        const response = await api.post('/api/auth/login', {
          email: formData.email,
          password: formData.password,
        });
        login(response.data.token);
        navigate('/');
      } else {
        const registerData = {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password,
          groupId: formData.group,
        };

        const response = await api.post('/api/auth/register', registerData);

        if (response.data) {
          alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
          setIsLogin(true);
        }
      }
    } catch (err) {
      console.error('Erro completo:', err);
      if (err.response?.data?.message) {
        const errorMessages = Array.isArray(err.response.data.message)
          ? err.response.data.message
          : [err.response.data.message];
        setErrors(errorMessages);
      } else {
        setErrors([isLogin ? 'Erro ao fazer login' : 'Erro ao criar usuário']);
      }
    }
  };

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-[#1A1F2C] relative overflow-hidden auth-page'>
      {/* Background Image */}
      <div
        className='absolute inset-0 opacity-20'
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1488590528505-98d2b5aba04b")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)',
        }}
      />

      {/* Auth Container */}
      <div className='w-full max-w-md p-8 mx-4 rounded-xl backdrop-blur-xl bg-[#221F26]/70 border border-white/10 shadow-xl relative z-10'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <h1 className='text-2xl font-bold text-white mb-2'>
            {isLogin ? 'Bem-vindo de volta' : 'Criar conta'}
          </h1>
          <p className='text-gray-400'>
            {isLogin ? 'Faça login na sua conta' : 'Preencha seus dados para começar'}
          </p>
        </div>

        {errors.length > 0 && (
          <Alert type='error' messages={errors} onClose={() => setErrors([])} />
        )}

        {/* Form */}
        <form className='space-y-4' onSubmit={handleSubmit}>
          {!isLogin && (
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <input
                  type='text'
                  name='firstName'
                  placeholder='Nome'
                  value={formData.firstName}
                  onChange={handleChange}
                  className='w-full px-4 py-2 rounded-lg bg-[#403E43] border border-[#555555] text-white placeholder:text-gray-400 focus:outline-none focus:border-[#9b87f5]'
                  required
                />
              </div>
              <div className='space-y-2'>
                <input
                  type='text'
                  name='lastName'
                  placeholder='Sobrenome'
                  value={formData.lastName}
                  onChange={handleChange}
                  className='w-full px-4 py-2 rounded-lg bg-[#403E43] border border-[#555555] text-white placeholder:text-gray-400 focus:outline-none focus:border-[#9b87f5]'
                  required
                />
              </div>
            </div>
          )}

          <div className='space-y-2'>
            <div className='relative'>
              <Mail className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                className='w-full pl-10 px-4 py-2 rounded-lg bg-[#403E43] border border-[#555555] text-white placeholder:text-gray-400 focus:outline-none focus:border-[#9b87f5]'
                required
              />
            </div>
          </div>

          <div className='space-y-2'>
            <div className='relative'>
              <Lock className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='Senha'
                value={formData.password}
                onChange={handleChange}
                className='w-full pl-10 px-4 py-2 rounded-lg bg-[#403E43] border border-[#555555] text-white placeholder:text-gray-400 focus:outline-none focus:border-[#9b87f5]'
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-2.5 text-gray-400'
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <>
              <div className='space-y-2'>
                <div className='relative'>
                  <Lock className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    placeholder='Confirmar Senha'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className='w-full pl-10 px-4 py-2 rounded-lg bg-[#403E43] border border-[#555555] text-white placeholder:text-gray-400 focus:outline-none focus:border-[#9b87f5]'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-3 top-2.5 text-gray-400'
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className='space-y-2'>
                <select
                  name='group'
                  value={formData.group}
                  onChange={handleChange}
                  className='w-full px-4 py-2 rounded-lg bg-[#403E43] border border-[#555555] text-white placeholder:text-gray-400 focus:outline-none focus:border-[#9b87f5]'
                  required
                >
                  <option value='Grupo A'>Grupo A</option>
                  <option value='Grupo B'>Grupo B</option>
                </select>
              </div>
            </>
          )}

          <button
            className='w-full px-4 py-2 rounded-lg bg-[#9b87f5] hover:bg-[#7E69AB] text-white transition-colors'
            type='submit'
          >
            {isLogin ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        {/* Toggle Auth Mode */}
        <div className='mt-6 text-center text-sm'>
          <p className='text-gray-400'>
            {isLogin ? 'Ainda não tem uma conta?' : 'Já tem uma conta?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className='text-[#9b87f5] hover:text-[#7E69AB] font-semibold'
            >
              {isLogin ? 'Criar conta' : 'Fazer login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
