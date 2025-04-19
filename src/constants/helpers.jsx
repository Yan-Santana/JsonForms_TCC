export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const isValidJson = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

export const downloadJson = (data, filename) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Erro ao copiar para área de transferência:', err);
    return false;
  }
};

export const getErrorMessage = (error) => {
  if (!error) return 'Erro desconhecido';

  if (typeof error === 'string') return error;

  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }

  if (error.message) return error.message;

  return 'Ocorreu um erro inesperado';
};

export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const generateUniqueId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const parseQueryString = (queryString) => {
  const params = {};
  const queries = queryString.substring(1).split('&');

  queries.forEach((query) => {
    const [key, value] = query.split('=');
    if (key) params[key] = decodeURIComponent(value || '');
  });

  return params;
};

export const buildQueryString = (params) => {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};
