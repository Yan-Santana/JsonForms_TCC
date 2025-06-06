import React, { useState, useEffect, useCallback } from 'react';
import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import PlaygroundHeader from './playgroundHeader';
import CodeEditor from './editor';
import FormPreview from './formPreview';
import { FORM_EXAMPLES } from '../pages/formExamples.jsx';

const Playground = () => {
  const [editorSchema, setEditorSchema] = useState(
    JSON.stringify(FORM_EXAMPLES[0].schema, null, 2),
  );
  const [editorUischema, setEditorUischema] = useState(
    JSON.stringify(FORM_EXAMPLES[0].uischema, null, 2),
  );
  const [formData, setFormData] = useState({});
  const [selected, setSelected] = useState(FORM_EXAMPLES[0].name);
  const [errors, setErrors] = useState({ code: 0, form: 0 });

  const registerError = async (type) => {
    try {
      await fetch('/api/analytics/error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          timestamp: new Date().toISOString(),
        }),
      });
      setErrors((prev) => ({
        ...prev,
        [type]: prev[type] + 1,
      }));
    } catch (e) {
      console.error('Erro ao registrar erro:', e);
    }
  };

  const getData = useCallback(() => {
    try {
      const schema = JSON.parse(editorSchema);
      const uischema = JSON.parse(editorUischema);
      return {
        schema,
        uischema,
        data: formData,
      };
    } catch (e) {
      console.error('Erro ao parsear JSON:', e);
      registerError('code');
      return null;
    }
  }, [editorSchema, editorUischema, formData]);

  const handleExampleSelect = (exampleName) => {
    const example = FORM_EXAMPLES.find((ex) => ex.name === exampleName);
    if (example) {
      setEditorSchema(JSON.stringify(example.schema, null, 2));
      setEditorUischema(JSON.stringify(example.uischema, null, 2));
      setFormData({});
      setSelected(exampleName);
    }
  };

  const handleSchemaChange = (value) => {
    setEditorSchema(value);
  };

  const handleUiSchemaChange = (value) => {
    setEditorUischema(value);
  };

  const handleFormError = () => {
    registerError('form');
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 2 }}>
      <PlaygroundHeader
        examples={FORM_EXAMPLES}
        selected={selected}
        onSelect={handleExampleSelect}
        getData={getData}
        errors={errors}
      />

      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ height: '100%', p: 2 }}>
            <CodeEditor value={editorSchema} onChange={handleSchemaChange} height='45vh' />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ height: '100%', p: 2 }}>
            <CodeEditor value={editorUischema} onChange={handleUiSchemaChange} height='45vh' />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormPreview
            schema={getData()?.schema || {}}
            uischema={getData()?.uischema || {}}
            data={formData}
            onChange={setFormData}
            onError={handleFormError}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Playground;
