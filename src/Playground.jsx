import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import {
  Grid,
  TextField,
  Paper,
  Button,
  Typography,
  CssBaseline,
  Container,
  Box,
} from '@mui/material';

const defaultSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'number' },
  },
  required: ['name'],
};

const defaultUiSchema = {
  type: 'VerticalLayout',
  elements: [
    { type: 'Control', scope: '#/properties/name' },
    { type: 'Control', scope: '#/properties/age' },
  ],
};

const defaultData = {
  name: '',
  age: 0,
};

function Playground() {
  const [schema, setSchema] = useState(JSON.stringify(defaultSchema, null, 2));
  const [uiSchema, setUiSchema] = useState(JSON.stringify(defaultUiSchema, null, 2));
  const [data, setData] = useState(defaultData);
  const [parsedSchema, setParsedSchema] = useState(defaultSchema);
  const [parsedUiSchema, setParsedUiSchema] = useState(defaultUiSchema);

  const applySchemas = () => {
    try {
      setParsedSchema(JSON.parse(schema));
      setParsedUiSchema(JSON.parse(uiSchema));
    } catch (err) {
      alert('Erro ao analisar JSON: ' + err.message);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth='xl' sx={{ py: 6 }}>
        <Typography variant='h4' gutterBottom align='center' fontWeight='bold'>
          JSON Forms Playground
        </Typography>
        <Grid container spacing={4}>
          {/* Editor de Schema e UI Schema */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
              <Typography variant='h6' gutterBottom>
                Schema
              </Typography>
              <TextField
                multiline
                fullWidth
                minRows={10}
                maxRows={20}
                value={schema}
                onChange={(e) => setSchema(e.target.value)}
                variant='outlined'
              />

              <Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
                UI Schema
              </Typography>
              <TextField
                multiline
                fullWidth
                minRows={10}
                maxRows={20}
                value={uiSchema}
                onChange={(e) => setUiSchema(e.target.value)}
                variant='outlined'
              />

              <Box mt={3} display='flex' justifyContent='center'>
                <Button variant='contained' onClick={applySchemas}>
                  Atualizar Formulário
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Formulário JSON */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 3, height: '100%' }}>
              <Typography variant='h6' gutterBottom>
                Formulário
              </Typography>
              <JsonForms
                schema={parsedSchema}
                uischema={parsedUiSchema}
                data={data}
                renderers={materialRenderers}
                onChange={({ data }) => setData(data)}
              />
            </Paper>
          </Grid>

          {/* Dados JSON */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 3, height: '100%' }}>
              <Typography variant='h6' gutterBottom>
                Data
              </Typography>
              <Box
                component='pre'
                sx={{
                  backgroundColor: 'hsl(var(--background))',
                  p: 2,
                  borderRadius: 2,
                  fontSize: 14,
                  overflowX: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                }}
              >
                {JSON.stringify(data, null, 2)}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Playground;
