import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import PrivateRoute from './components/PrivateRoute';
import Playground from './pages/Playground';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<AuthPage />} />
        <Route path='/signup' element={<Navigate to='/login' replace />} />
        <Route
          path='/'
          element={
            <PrivateRoute>
              <Playground />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
