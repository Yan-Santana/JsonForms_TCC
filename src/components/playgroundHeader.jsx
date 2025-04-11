import { Box, Typography, FormControl, Select, MenuItem, Button } from '@mui/material';

const PlaygroundHeader = ({ examples, selected, onSelect }) => {
  /*   const handleSubmit = async () => {
    try {
      const response = await fetch("http://seu-backend.com/api/rota", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedExample: selected }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar dados para o backend");
      }

      const data = await response.json();
      console.log("Resposta do backend:", data);
    } catch (error) {
      console.error("Erro:", error);
    }
  }; */

  return (
    <Box display='flex' alignItems='center' justifyContent='space-between' mb={2}>
      <Typography variant='h5' fontWeight='bold'>
        JSON Form Playground
      </Typography>
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
      <FormControl size='small' sx={{ minWidth: 150 }}>
        <Button
          //onClick={handleSubmit}
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
      </FormControl>
    </Box>
  );
};

export default PlaygroundHeader;
