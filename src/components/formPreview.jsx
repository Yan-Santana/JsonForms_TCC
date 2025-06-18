import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { Paper, Typography, Box } from '@mui/material';
import { useEffect, useRef } from 'react';

const FormPreview = ({ schema, uischema, data, onChange, onError, onFieldInteraction }) => {
  const formRef = useRef(null);
  const errorCheckInterval = useRef(null);

  // Função para verificar erros de renderização
  const checkForRenderErrors = () => {
    if (!formRef.current) return;

    const errorElements = formRef.current.querySelectorAll(
      '.MuiAlert-standardError, .MuiFormHelperText-root.Mui-error',
    );
    const noRendererErrors = Array.from(formRef.current.querySelectorAll('*')).some(
      (el) => el.textContent === 'No applicable renderer found.',
    );

    if (errorElements.length > 0 || noRendererErrors) {
      if (onError) {
        onError('render_error');
      }
    }
  };

  useEffect(() => {
    // Verificar erros a cada 4 segundos
    errorCheckInterval.current = setInterval(checkForRenderErrors, 4000);

    return () => {
      if (errorCheckInterval.current) {
        clearInterval(errorCheckInterval.current);
      }
    };
  }, [schema, uischema]);

  const handleChange = ({ data, errors }) => {
    // Se houver uma mudança em um campo específico, registrar a interação
    const changedField = Object.keys(data).find((key) => data[key] !== onChange.data?.[key]);
    if (changedField && onFieldInteraction) {
      onFieldInteraction(changedField);
    }

    // Verificar se há erros de validação
    if (errors && errors.length > 0) {
      if (onError) {
        onError('validation_error');
      }
    }

    onChange(data);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
        Visualização do formulário JSON renderizado
      </Typography>
      <Box ref={formRef} sx={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', pr: 2 }}>
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
