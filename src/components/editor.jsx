import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Box, Button, Tooltip } from '@mui/material';
import { RotateCcw, AlertCircle } from 'lucide-react';

const CodeEditor = ({ value, onChange, height = '870px', onReset, resetLabel = 'Reset' }) => {
  const monacoRef = useRef(null);
  const [isJsonValid, setIsJsonValid] = useState(true);

  const handleEditorDidMount = (editor) => {
    monacoRef.current = editor;
  };

  const handleChange = (value) => {
    // Validar JSON
    try {
      JSON.parse(value);
      setIsJsonValid(true);
    } catch (error) {
      setIsJsonValid(false);
    }

    onChange(value);
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {onReset && (
        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
          <Tooltip title={`Reset ${resetLabel}`}>
            <Button
              size='small'
              variant='outlined'
              onClick={handleReset}
              sx={{
                minWidth: 'auto',
                p: 1,
                color: 'rgba(244, 20, 20, 0.7)',
                borderColor: 'rgba(255, 255, 255, 0.76)',
                '&:hover': {
                  color: '#9b87f5',
                  borderColor: '#9b87f5',
                },
              }}
            >
              <RotateCcw size={16} />
            </Button>
          </Tooltip>
        </Box>
      )}

      {!isJsonValid && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: 'rgba(244, 67, 54, 0.9)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        >
          <AlertCircle size={14} />
          JSON Inválido
        </Box>
      )}

      <Editor
        height={height}
        defaultLanguage='json'
        value={value}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        theme='vs-dark'
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true,
        }}
      />
    </Box>
  );
};

export default CodeEditor;
