import { Box, Typography, FormControl, Select, MenuItem, Button } from '@mui/material';
import { logout } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const PlaygroundHeader = ({ examples, selected, onSelect }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:3001/submit-form', {
      method: 'POST',
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
    <Box display='flex' alignItems='center' justifyContent='space-between' mb={3}>
      <Typography
        variant='h4'
        fontWeight='bold'
        className='title-effect'
        sx={{
          fontSize: '2rem',
          textTransform: 'uppercase',
          mb: 1,
        }}
      >
        JSON Form Playground
      </Typography>
      <Box display='flex' alignItems='center' gap={2}>
        <FormControl size='small' sx={{ minWidth: 200 }}>
          <Select
            value={selected}
            onChange={(e) => onSelect(e.target.value)}
            sx={{
              backgroundColor: '#9b87f5',
              color: '#ffffff',
              borderRadius: '8px',
              '& .MuiSelect-icon': {
                color: '#ffffff',
              },
              '&:hover': {
                backgroundColor: '#7E69AB',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: '2px solid #7E69AB',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#221F26',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '& .MuiMenuItem-root': {
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(155, 135, 245, 0.1)',
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(155, 135, 245, 0.2)',
                      '&:hover': {
                        backgroundColor: 'rgba(155, 135, 245, 0.3)',
                      },
                    },
                  },
                },
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
            borderRadius: '8px',
            fontWeight: 'bold',
            padding: '8px 24px',
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
            borderRadius: '8px',
            fontWeight: 'bold',
            padding: '8px 24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
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
