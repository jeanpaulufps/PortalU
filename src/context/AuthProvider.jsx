import { createContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem('user'))
  );
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = (code, document, password) => {
    const formData = new FormData();
    formData.set('codigo', code);
    formData.set('numeroDocumento', document);
    formData.set('password', password);

    fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      body: formData,
    })
      .then((e) => e.json())
      .then((data) => {
        setLoading(false);
        setUser(data.usuario);
        window.localStorage.setItem('user', JSON.stringify(data.usuario));
        navigate('/');
      })
      .catch(() => toast.error('Credenciales invalidas'))
      .finally(() => setLoading(false));
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem('user');
    navigate('/login')
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
