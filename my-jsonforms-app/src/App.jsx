import { JsonForms } from "@jsonforms/react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { CssBaseline, Container, Typography, Paper, Box } from "@mui/material";
import { schema, uiSchema, initialData } from "./formConfig";

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        display="flex"
        justifyContent="left"
        alignItems="left"
        flexDirection="column"
        marginTop={10}
      >
        <Container>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Rules Json Forms
            </Typography>
            <Box mt={3}>
              <JsonForms
                schema={schema}
                uischema={uiSchema}
                data={initialData}
                renderers={materialRenderers}
                cells={materialCells}
              />
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default App;
