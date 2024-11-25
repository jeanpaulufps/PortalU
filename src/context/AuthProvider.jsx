import { createContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem('user')) || { }
  );
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = (code, document, password) => {
    setLoading(true);

    const formData = new FormData();
    formData.set('codigo', code);
    formData.set('numeroDocumento', document);
    formData.set('password', password);

    fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      body: formData,
    })
      .then((resp) => {
        if (!resp.ok) {
          return Promise.reject(
            new Error(`Error ${resp.status}: ${resp.statusText}`)
          );
        }
        return resp.json();
      })
      .then((data) => {
        setUser(data.usuario);
        window.localStorage.setItem('user', JSON.stringify(data.usuario));
        navigate('/');
      })
      .catch(() => {
        toast.error('Credenciales invalidas');
      })
      .finally(() => setLoading(false));
  };

  const logout = () => {
    setUser({});
    window.localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        loading,
        isAuth: !(Object.keys(user).length === 0),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
