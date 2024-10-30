import { useState } from 'react';

function RecuperarContrasena() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); // Limpiar el mensaje anterior

    if (!email) {
      setMessage('El correo es obligatorio');
      setLoading(false);
      return;
    }

    // Simulación de envío de correo
    setTimeout(() => {
      setLoading(false);
      setMessage('Se envió un correo para recuperar su contraseña. Revise su bandeja de entrada.');
      setEmail(''); // Limpiar el campo de correo después del envío
    }, 2000);
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
        <h1 style={{ margin: '8px 0', textAlign: 'center' }}>
          Recuperar contraseña
        </h1>
        <p style={{ textAlign: 'center', marginBottom: '16px' }}>
          Introduce tu correo electrónico y te enviaremos un enlace para que vuelvas a entrar en tu cuenta.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block' }} htmlFor="email">
              Correo electrónico
            </label>
            <input
              style={{
                padding: '8px 16px',
                display: 'block',
                width: '-webkit-fill-available',
              }}
              placeholder="tucorreo@gmail.com"
              type="email"
              id="email"
              value={email} // Vincular el valor del input al estado
              onChange={(e) => setEmail(e.target.value)} // Actualizar el estado cuando cambia el input
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
            value="Enviar"
          />

          {/* Mensaje de feedback */}
          {message && (
            <div style={{ textAlign: 'center', marginTop: '10px', color: loading ? 'grey' : 'green' }}>
              {message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default RecuperarContrasena;
