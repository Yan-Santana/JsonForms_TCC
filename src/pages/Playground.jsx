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
    <div style={{ padding: '2rem' }}>
      <PlaygroundHeader
        examples={examples}
        selected={selectedExample}
        onSelect={handleChangeExample}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2}>
            <Tabs
              value={tabIndex}
              onChange={(e, newVal) => setTabIndex(newVal)}
              variant='fullWidth'
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
          <FormPreview
            schema={parseJSON(schema)}
            uischema={parseJSON(uischema)}
            data={formData}
            onChange={setFormData}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Playground;
