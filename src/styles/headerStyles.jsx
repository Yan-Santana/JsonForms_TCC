export const STYLES = {
  header: {
    title: {
      fontSize: '2rem',
      textTransform: 'uppercase',
      mb: 1,
    },
    select: {
      backgroundColor: '#9b87f5',
      color: '#ffffff',
      borderRadius: '8px',
      '& .MuiSelect-icon': {
        color: '#ffffff',
      },
      '&:hover': {
        backgroundColor: '#7E69AB',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '2px solid #7E69AB',
      },
    },
    submitButton: {
      backgroundColor: '#28a745',
      color: '#ffffff',
      borderRadius: '8px',
      fontWeight: 'bold',
      padding: '8px 24px',
      '&:hover': {
        backgroundColor: '#218838',
      },
    },
    logoutButton: {
      backgroundColor: '#dc3545',
      color: '#ffffff',
      borderRadius: '8px',
      fontWeight: 'bold',
      padding: '8px 24px',
      '&:hover': {
        backgroundColor: '#c82333',
      },
    },
  },
};

export const SNACKBAR_DURATION = 6000;
