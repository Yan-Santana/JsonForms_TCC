import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { logout, getProfile } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { STYLES, SNACKBAR_DURATION } from '../styles/headerStyles';
import { validateFormData } from '../pages/formValidation.jsx';
import api from '../config/api';

const PlaygroundHeader = ({
  examples,
  selected,
  onSelect,
  getData,
  onSchemaEdit,
  onUiSchemaEdit,
}) => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [userData, setUserData] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [firstAttemptTime, setFirstAttemptTime] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getProfile();
        setUserData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        if (error.response?.status === 401) {
          logout();
          navigate('/login');
        }
        setSnackbar({
          open: true,
          message: 'Erro ao buscar dados do usuário',
          severity: 'error',
        });
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleStart = async () => {
    if (!userData) {
      setSnackbar({
        open: true,
        message: 'Dados do usuário não disponíveis',
        severity: 'error',
      });
      return;
    }

    setIsStarted(true);
    const currentTime = Date.now();
    setStartTime(currentTime);

    if (!firstAttemptTime) {
      setFirstAttemptTime(currentTime);
      // Registrar o tempo da primeira tentativa no backend
      try {
        await api.post('/api/analytics/attempt', {
          userId: userData.id,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Erro ao registrar primeira tentativa:', error);
      }
    }
  };

  const handleExampleChange = async (value) => {
    // Registrar o reset de código
    if (userData && isStarted) {
      try {
        await api.post('/api/analytics/reset', {
          userId: userData.id,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Erro ao registrar reset de código:', error);
      }
    }

    // Resetar os timers
    setIsStarted(false);
    setStartTime(null);
    setFirstAttemptTime(null);

    // Chamar o onSelect original
    onSelect(value);
  };

  const handleSubmit = async () => {
    if (!userData) {
      setSnackbar({
        open: true,
        message: 'Dados do usuário não disponíveis',
        severity: 'error',
      });
      return;
    }

    if (!isStarted) {
      setSnackbar({
        open: true,
        message: 'Clique em INICIAR antes de enviar',
        severity: 'error',
      });
      return;
    }

    try {
      const formData = getData();
      if (!formData) {
        setSnackbar({
          open: true,
          message: 'JSON inválido no editor',
          severity: 'error',
        });
        return;
      }

      // Verificar se há erros de renderização
      const hasRenderError =
        document.querySelector('.MuiAlert-standardError') !== null ||
        Array.from(document.querySelectorAll('*')).some(
          (el) => el.textContent === 'No applicable renderer found.',
        );

      if (hasRenderError) {
        // Enviar o erro para análise antes de mostrar a mensagem
        await api.post('/api/analytics/error', {
          userId: userData.id,
          errorType: 'render_error',
          formName: selected,
          timestamp: new Date().toISOString(),
        });

        setSnackbar({
          open: true,
          message: 'Corrija os erros de renderização antes de enviar',
          severity: 'error',
        });
        return;
      }

      // Validar dados
      const validationErrors = validateFormData(formData);
      if (validationErrors.length > 0) {
        setSnackbar({
          open: true,
          message: 'Erros de validação encontrados:\n' + validationErrors.join('\n'),
          severity: 'error',
        });
        return;
      }

      const requestData = {
        userId: userData.id,
        formData: {
          ...formData,
          name: selected,
        },
        metrics: {
          totalTimeSpent: Date.now() - startTime,
          firstAttemptTime: firstAttemptTime ? Date.now() - firstAttemptTime : null,
        },
      };

      const response = await api.post('/api/forms/submit', requestData);

      if (response.data) {
        // Resetar o timer após envio bem-sucedido
        setIsStarted(false);
        setStartTime(null);
        setFirstAttemptTime(null);

        setSnackbar({
          open: true,
          message: 'Formulário enviado com sucesso!',
          severity: 'success',
        });
      }
    } catch (error) {
      console.error('Erro:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Erro ao conectar com o servidor',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box display='flex' alignItems='center' justifyContent='space-between' mb={3}>
      <Typography variant='h4' fontWeight='bold' className='title-effect' sx={STYLES.header.title}>
        JSON Form Playground
      </Typography>
      <Box display='flex' alignItems='center' gap={2}>
        <FormControl size='small' sx={{ minWidth: 200 }}>
          <Select
            value={selected}
            onChange={(e) => handleExampleChange(e.target.value)}
            sx={STYLES.header.select}
          >
            {examples.map((ex) => (
              <MenuItem key={ex.name} value={ex.name}>
                {ex.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={handleStart}
          disabled={isStarted}
          sx={{
            ...STYLES.header.submitButton,
            bgcolor: isStarted ? 'grey.500' : 'success.main',
            '&:hover': {
              bgcolor: isStarted ? 'grey.600' : 'success.dark',
            },
          }}
        >
          {isStarted ? 'INICIADO' : 'INICIAR'}
        </Button>
        <Button onClick={handleSubmit} disabled={!isStarted} sx={STYLES.header.submitButton}>
          ENVIAR
        </Button>
        <Button onClick={handleLogout} sx={STYLES.header.logoutButton}>
          SAIR
        </Button>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={SNACKBAR_DURATION}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PlaygroundHeader;
