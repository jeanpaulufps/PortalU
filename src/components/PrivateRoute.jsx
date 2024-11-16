import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext as AuthContext } from '../context/AuthProvider';

function PrivateRoute({ children }) {
  const { isAuth } = useContext(AuthContext);
  console.log(123);
  
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
