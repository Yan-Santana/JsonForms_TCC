import React, { useState, useCallback, useEffect } from 'react';
import { Grid, Tabs, Tab, Paper } from '@mui/material';
import PlaygroundHeader from '../components/playgroundHeader';
import CodeEditor from '../components/editor';
import FormPreview from '../components/formPreview';
import TabPanel from '../components/tabPanel';

// Importa todos os arquivos .jsx da pasta utils
const modules = import.meta.glob('../utils/*.jsx', { eager: true });

// Filtra apenas os exemplos (objetos que têm a propriedade 'name')
const examples = Object.values(modules)
  .map((module) => module.default || Object.values(module)[0])
  .filter((example) => example && example.name);

function Playground() {
  const initialExample = examples[0];
  const [editorSchema, setEditorSchema] = useState(JSON.stringify(initialExample.schema, null, 2));
  const [editorUischema, setEditorUischema] = useState(
    JSON.stringify(initialExample.uischema, null, 2),
  );
  const [formData, setFormData] = useState(initialExample.data || {});
  const [selected, setSelected] = useState(initialExample.name);
  const [tabIndex, setTabIndex] = useState(0);

  const handleGetData = useCallback(() => {
    try {
      return {
        schema: JSON.parse(editorSchema),
        uischema: JSON.parse(editorUischema),
        data: formData,
      };
    } catch (e) {
      console.error('Erro ao parsear JSON:', e);
      return null;
    }
  }, [editorSchema, editorUischema, formData]);

  const handleExampleSelect = (exampleName) => {
    const example = examples.find((ex) => ex.name === exampleName);
    if (example) {
      setEditorSchema(JSON.stringify(example.schema, null, 2));
      setEditorUischema(JSON.stringify(example.uischema, null, 2));
      setFormData(example.data || {});
      setSelected(exampleName);
    }
  };

  const currentData = handleGetData();

  return (
    <div className='min-h-screen bg-[#1A1F2C] text-white'>
      <div className='p-8'>
        <PlaygroundHeader
          examples={examples}
          selected={selected}
          onSelect={handleExampleSelect}
          getData={handleGetData}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: '#221F26',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <Tabs
                value={tabIndex}
                onChange={(e, newVal) => setTabIndex(newVal)}
                variant='fullWidth'
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  '& .MuiTab-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                  '& .Mui-selected': {
                    color: '#9b87f5 !important',
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#9b87f5',
                  },
                }}
              >
                <Tab label='JSON Schema' />
                <Tab label='UI Schema' />
                <Tab label='Data' />
              </Tabs>

              <TabPanel value={tabIndex} index={0}>
                <CodeEditor value={editorSchema} onChange={setEditorSchema} />
              </TabPanel>
              <TabPanel value={tabIndex} index={1}>
                <CodeEditor value={editorUischema} onChange={setEditorUischema} />
              </TabPanel>
              <TabPanel value={tabIndex} index={2}>
                <CodeEditor
                  value={JSON.stringify(formData, null, 2)}
                  onChange={(v) => {
                    try {
                      setFormData(JSON.parse(v));
                    } catch {
                      // Ignora erros de parse durante a digitação
                    }
                  }}
                />
              </TabPanel>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: '#221F26',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '24px',
              }}
            >
              <FormPreview
                schema={currentData?.schema || {}}
                uischema={currentData?.uischema || {}}
                data={formData}
                onChange={setFormData}
                onFieldInteraction={(fieldName) => {
                  // Registrar interação com o campo
                  if (window.registerFieldInteraction) {
                    window.registerFieldInteraction(fieldName);
                  }
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Playground;
