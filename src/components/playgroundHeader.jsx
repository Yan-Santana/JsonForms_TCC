import { Box, Typography, FormControl, Select, MenuItem, Button } from '@mui/material';
import { logout } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const PlaygroundHeader = ({ examples, selected, onSelect }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:3001/submit-form', {
      method: 'POST', // TESTE TESTE
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: 'usuario_teste',
        group: 'A',
        formData: window.formData || {},
      }),
    });

    const result = await response.json();
    console.log(result.message);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box display='flex' alignItems='center' justifyContent='space-between' mb={2}>
      <Typography variant='h5' fontWeight='bold'>
        JSON Form Playground
      </Typography>
      <Box display='flex' alignItems='center' gap={2}>
        <FormControl size='small' sx={{ minWidth: 200 }}>
          <Select
            value={selected}
            onChange={(e) => onSelect(e.target.value)}
            sx={{
              backgroundColor: '#1351B4',
              color: '#ffffff',
              borderRadius: '8px',
              '& .MuiSelect-icon': {
                color: '#ffffff',
              },
              '&:hover': {
                backgroundColor: '#002266',
              },
            }}
          >
            {examples.map((ex) => (
              <MenuItem key={ex.name} value={ex.name}>
                {ex.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={handleSubmit}
          sx={{
            backgroundColor: '#28a745',
            color: '#ffffff',
            borderRadius: '100px',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#218838',
            },
          }}
        >
          ENVIAR
        </Button>
        <Button
          onClick={handleLogout}
          sx={{
            backgroundColor: '#dc3545',
            color: '#ffffff',
            borderRadius: '100px',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#c82333',
            },
          }}
        >
          SAIR
        </Button>
      </Box>
    </Box>
  );
};

export default PlaygroundHeader;
