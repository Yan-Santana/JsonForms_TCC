import { useRef } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ value, onChange, height = '900px' }) => {
  const monacoRef = useRef(null);

  const handleEditorDidMount = (editor) => {
    monacoRef.current = editor;
  };

  return (
    <Editor
      height={height}
      defaultLanguage='json'
      value={value}
      onChange={onChange}
      onMount={handleEditorDidMount}
      theme='vs-dark'
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
