import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { Paper, Typography, Box } from '@mui/material';

const FormPreview = ({ schema, uischema, data, onChange }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
        Visualização do formulário JSON renderizado
      </Typography>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        onChange={({ data }) => onChange(data)}
        renderers={materialRenderers}
        cells={materialCells}
      />
    </Paper>
  );
};

export default FormPreview;
