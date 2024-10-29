import { Link } from 'react-router-dom';

function Login() {
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
        style={{
          background: 'white',
          padding: '16px 32px',
          borderRadius: 8,
        }}
        action=""
      >
        <h1 style={{ margin: '8px 0' }}>Formulario de ingreso</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
              placeholder="asasas"
              type="text"
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
              placeholder="asasas"
              type="text"
            />
          </div>

          <input
            style={{
              width: '50%',
              margin: 'auto',
              padding: '8px 16px',
              fontSize: 16,
              background: 'blue',
            }}
            type="submit"
            value="Ingresar"
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
