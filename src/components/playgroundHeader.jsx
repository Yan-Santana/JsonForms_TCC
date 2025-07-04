import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';
import { logout, getProfile } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { STYLES, SNACKBAR_DURATION } from '../styles/headerStyles';
import { validateFormData } from '../pages/formValidation.jsx';
import api from '../config/api';
import { LayoutDashboard } from 'lucide-react';

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

  // Encontrar o exemplo selecionado para obter a introdução
  const selectedExample = examples.find((ex) => ex.name === selected);

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
        // Registrar erro de JSON inválido
        await api.post('/api/analytics/error', {
          userId: userData.id,
          errorType: 'invalid_json',
          timestamp: new Date().toISOString(),
        });

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
        // Registrar erro de validação
        await api.post('/api/analytics/error', {
          userId: userData.id,
          errorType: 'validation_error',
          timestamp: new Date().toISOString(),
        });

        setSnackbar({
          open: true,
          message: 'Erros de validação encontrados:\n' + validationErrors.join('\n'),
          severity: 'error',
        });
        return;
      }

      // Registrar o tempo da primeira tentativa se ainda não foi registrado
      if (firstAttemptTime && startTime) {
        const elapsedTime = Date.now() - startTime;
        await api.post('/api/analytics/attempt', {
          userId: userData.id,
          elapsed: elapsedTime,
        });
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

      // Registrar erro de conexão
      await api.post('/api/analytics/error', {
        userId: userData.id,
        errorType: 'connection_error',
        timestamp: new Date().toISOString(),
      });

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
    <Box>
      <Box display='flex' alignItems='center' justifyContent='space-between' mb={3}>
        <Typography
          variant='h4'
          fontWeight='bold'
          className='title-effect'
          sx={STYLES.header.title}
        >
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
          <Button
            onClick={() => navigate('/analytics')}
            sx={{
              ...STYLES.header.logoutButton,
              bgcolor: '#23272f',
              color: '#9b87f5',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
            title='Ir para Dashboard Learning Analytics'
          >
            <LayoutDashboard className='h-5 w-5' />
          </Button>
        </Box>
      </Box>

      {/* Exibir introdução do teste se existir */}
      {selectedExample?.introduction && (
        <Paper
          elevation={2}
          sx={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px',
          }}
        >
          <Typography
            variant='body1'
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: 1.6,
              whiteSpace: 'pre-line',
            }}
          >
            {selectedExample.introduction}
          </Typography>
        </Paper>
      )}

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
