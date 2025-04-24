import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { Paper, Typography, Box } from '@mui/material';

const FormPreview = ({ schema, uischema, data, onChange, onFieldInteraction }) => {
  const handleChange = ({ data, errors }) => {
    // Se hhouver uma mudança em um campo específico, registrar a interação
    const changedField = Object.keys(data).find((key) => data[key] !== onChange.data?.[key]);
    if (changedField && onFieldInteraction) {
      onFieldInteraction(changedField);
    }

    onChange(data);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
        Visualização do formulário JSON renderizado
      </Typography>
      <Box sx={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', pr: 2 }}>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          onChange={handleChange}
          renderers={materialRenderers}
          cells={materialCells}
        />
      </Box>
    </Paper>
  );
};

export default FormPreview;
