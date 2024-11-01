import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext as AuthContext } from '../context/AuthProvider';

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
