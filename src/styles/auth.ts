import { CSSProperties } from 'react';

interface AuthStyles {
  container: CSSProperties;
  formContainer: CSSProperties;
  header: CSSProperties;
  title: CSSProperties;
  subtitle: CSSProperties;
  error: CSSProperties;
  formGroup: CSSProperties;
  label: CSSProperties;
  input: CSSProperties;
  inputFocus: CSSProperties;
  button: CSSProperties;
  buttonHover: CSSProperties;
  footer: CSSProperties;
  footerText: CSSProperties;
  link: CSSProperties;
  linkHover: CSSProperties;
}

export const authStyles: AuthStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  header: {
    marginBottom: '2rem',
    textAlign: 'center' as const,
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#666666',
    fontSize: '1rem',
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    fontSize: '0.875rem',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#333333',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  inputFocus: {
    borderColor: '#1976d2',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#ffffff',
    backgroundColor: '#1976d2',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  buttonHover: {
    backgroundColor: '#1565c0',
  },
  footer: {
    marginTop: '2rem',
    padding: '1rem 0',
    borderTop: '1px solid #e0e0e0',
    textAlign: 'center' as const,
  },
  footerText: {
    color: '#666666',
    marginRight: '0.5rem',
  },
  link: {
    color: '#1976d2',
    textDecoration: 'none',
    fontWeight: '500',
  },
  linkHover: {
    textDecoration: 'underline',
  },
};
