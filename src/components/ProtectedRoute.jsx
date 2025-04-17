import { Navigate } from 'react-router-dom';
import { TOKEN_KEY } from '../services/auth';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default ProtectedRoute;
