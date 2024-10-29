import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Login() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const [email, password] = e.target;

    if (!email.value) {
      toast.error('El correo es obligatorio');
      setLoading(false);
      return;
    }
    if (!password.value) {
      toast.error('La contraseña es obligatoria');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 3000);

    // const response = fetch('asdasd').then(e=>e.json()).then(res=> );
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
        <h1 style={{ margin: '8px 0' }}>Formulario de ingreso</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block' }} htmlFor="">
              Correo electronico
            </label>
            <input
              style={{
                padding: '8px 16px',
                display: 'block',
                width: '-webkit-fill-available',
              }}
              placeholder="tucorreo@gmail.com"
              type="email"
            />
          </div>

          <div>
            <label style={{ display: 'block' }} htmlFor="">
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
        </div>
      </form>
    </div>
  );
}

export default Login;
