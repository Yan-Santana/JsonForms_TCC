import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { Paper, Typography, Box } from '@mui/material';
import { useEffect, useRef, useCallback } from 'react';

const FormPreview = ({ schema, uischema, data, onChange, onError, onFieldInteraction }) => {
  const formRef = useRef(null);
  const lastErrorCheck = useRef(null);
  const lastSchemaHash = useRef('');

  // Função para verificar erros de renderização
  const checkForRenderErrors = useCallback(() => {
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
  }, [onError]);

  useEffect(() => {
    // Criar um hash simples do schema para detectar mudanças reais
    const currentSchemaHash = JSON.stringify({ schema, uischema });
    
    // Só verificar erros se:
    // 1. O schema realmente mudou (não é apenas uma re-renderização)
    // 2. Não verificamos erros recentemente (evita múltiplas verificações)
    if (currentSchemaHash !== lastSchemaHash.current) {
      lastSchemaHash.current = currentSchemaHash;
      
      // Verificar erros apenas uma vez após a mudança do schema
      const timeoutId = setTimeout(() => {
        checkForRenderErrors();
        lastErrorCheck.current = Date.now();
      }, 200);
      
      return () => clearTimeout(timeoutId);
    }
  }, [schema, uischema, checkForRenderErrors]);

  const handleChange = ({ data, errors }) => {
    // Se houver uma mudança em um campo específico, registrar a interação
    const changedField = Object.keys(data).find((key) => data[key] !== onChange.data?.[key]);
    if (changedField && onFieldInteraction) {
      onFieldInteraction(changedField);
    }

    // Verificar se há erros de validação apenas quando necessário
    // Evitar registrar erros a cada interação do usuário
    if (errors && errors.length > 0) {
      // Só registrar erro se não verificamos recentemente ou se é um erro novo
      const currentTime = Date.now();
      if (!lastErrorCheck.current || currentTime - lastErrorCheck.current > 5000) {
        if (onError) {
          onError('validation_error');
          lastErrorCheck.current = currentTime;
        }
      }
    }

    onChange(data);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
        Visualização do formulário JSON renderizado
      </Typography>
      <Box ref={formRef} sx={{ maxHeight: '800px', overflowY: 'auto', pr: 2 }}>
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
