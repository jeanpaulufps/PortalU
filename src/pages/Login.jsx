import { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

function Login() {
  const { login, loading, user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const [codigo, documento, password] = e.target;

    if (!codigo.value) {
      toast.error('El código es obligatorio');
      return;
    }
    if (!documento.value) {
      toast.error('El documento es obligatorio');
      return;
    }
    if (!password.value) {
      toast.error('La contraseña es obligatoria');
      return;
    }

    login(codigo.value, documento.value, password.value);
  };

  return (
    <div className="login-wrapper">
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'white',
          padding: '16px 32px',
          borderRadius: 8,
        }}
      >
        <h1 style={{ margin: '8px 0', width: '250px', textAlign: 'center' }}>
          AdminU
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block' }} htmlFor="codigo">
              Código
            </label>
            <input
              style={{
                padding: '8px 16px',
                display: 'block',
                width: '-webkit-fill-available',
              }}
              placeholder="Ingrese su código"
              type="text"
              id="codigo"
            />
          </div>

          <div>
            <label style={{ display: 'block' }} htmlFor="documento">
              Documento
            </label>
            <input
              style={{
                padding: '8px 16px',
                display: 'block',
                width: '-webkit-fill-available',
              }}
              placeholder="Ingrese su documento"
              type="text"
              id="documento"
            />
          </div>

          <div>
            <label style={{ display: 'block' }} htmlFor="password">
              Contraseña
            </label>
            <input
              style={{
                padding: '8px 16px',
                display: 'block',
                width: '-webkit-fill-available',
              }}
              placeholder="*******"
              type="password"
              id="password"
            />
          </div>

          <input
            style={{
              width: '50%',
              margin: 'auto',
              padding: '8px 16px',
              fontSize: 16,
              background: loading ? '#4e3f8688' : '#4e3f86',
              color: 'white',
              borderRadius: 4,
              cursor: loading ? 'default' : 'pointer',
            }}
            disabled={loading}
            type="submit"
            value="Ingresar"
          />
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <Link to="/forgot-password" style={{ color: '#4e3f86' }}>
              ¿Haz olvidado tu contraseña?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
