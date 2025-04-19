import { useState } from 'react';
import { Grid, Tabs, Tab, Paper } from '@mui/material';
import PlaygroundHeader from '../components/playgroundHeader';
import CodeEditor from '../components/editor';
import FormPreview from '../components/formPreview';
import TabPanel from '../components/tabPanel';
import { examples } from '../utils/examples';

const Playground = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedExample, setSelectedExample] = useState(examples[0].name);

  const current = examples.find((e) => e.name === selectedExample);

  const [schema, setSchema] = useState(JSON.stringify(current.schema, null, 2));
  const [uischema, setUiSchema] = useState(JSON.stringify(current.uischema, null, 2));
  const [formData, setFormData] = useState(current.data);

  const handleChangeExample = (exampleName) => {
    const ex = examples.find((e) => e.name === exampleName);
    setSelectedExample(exampleName);
    setSchema(JSON.stringify(ex.schema, null, 2));
    setUiSchema(JSON.stringify(ex.uischema, null, 2));
    setFormData(ex.data);
  };

  const parseJSON = (text, fallback = {}) => {
    try {
      return JSON.parse(text);
    } catch {
      return fallback;
    }
  };

  return (
    <div className='min-h-screen bg-[#1A1F2C] text-white'>
      <div className='p-8'>
        <PlaygroundHeader
          examples={examples}
          selected={selectedExample}
          onSelect={handleChangeExample}
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
                <CodeEditor value={schema} onChange={(v) => setSchema(v)} />
              </TabPanel>
              <TabPanel value={tabIndex} index={1}>
                <CodeEditor value={uischema} onChange={(v) => setUiSchema(v)} />
              </TabPanel>
              <TabPanel value={tabIndex} index={2}>
                <CodeEditor
                  value={JSON.stringify(formData, null, 2)}
                  onChange={(v) => {
                    try {
                      setFormData(JSON.parse(v));
                    } catch {
                      // Ignoring JSON parse errors
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
                schema={parseJSON(schema)}
                uischema={parseJSON(uischema)}
                data={formData}
                onChange={setFormData}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Playground;
