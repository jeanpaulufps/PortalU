import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const [codigo, documento, password] = e.target;

    if (!codigo.value) {
      toast.error('El código es obligatorio');
      setLoading(false);
      return;
    }
    if (!documento.value) {
      toast.error('El documento es obligatorio');
      setLoading(false);
      return;
    }
    if (!password.value) {
      toast.error('La contraseña es obligatoria');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.set('codigo', codigo.value);
    formData.set('numeroDocumento', documento.value);
    formData.set('password', password.value);

    fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      body: formData,
    })
      .then((e) => e.json())
      .then((data) => {
        setLoading(false);
        navigate('/');
      })
      .catch(() => toast.error('Credenciales invalidas'))
      .finally(() => setLoading(false));
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(./login-background.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
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
            <Link to="/RecuperarContraseña" style={{ color: '#4e3f86' }}>
              ¿Haz olvidado tu contraseña?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
