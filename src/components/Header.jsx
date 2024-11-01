import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

function Header() {
  const { logout } = useContext(AuthContext);

  return (
    <header
      style={{
        background: '#000b8b',
        height: 50,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Link
        to="/"
        style={{
          display: 'block',
          color: 'white',
          textDecoration: 'none',
          fontSize: 24,
          textAlign: 'center',
          width: 230,
          lineHeight: '50px',
        }}
      >
        ESTUDIANTES
      </Link>

      <div>
        <button
          style={{
            height: '100%',
            padding: '8px 16px',
            background: 'none',
            color: 'white',
            fontSize: 14,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Notificaciones
        </button>
        <button
          style={{
            height: '100%',
            padding: '8px 16px',
            background: 'none',
            color: 'white',
            fontSize: 14,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Perfil
        </button>
        <button
          style={{
            height: '100%',
            padding: '8px 16px',
            background: 'none',
            color: 'white',
            fontSize: 14,
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={logout}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default Header;
