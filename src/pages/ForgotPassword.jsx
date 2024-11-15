import { useState } from 'react';
import toast from 'react-hot-toast';
import { API_URL } from '../constants';

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      toast.error('El correo electronico es obligatorio');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.set('correoInstitucional', email);

    fetch(`${API_URL}/password_reset/`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(
            new Error('Ha ocurrido un error, intentalo más tarde')
          );
        }
        return response.json();
      })
      .then((data) => toast.success(data.message, { duration: 10000 }))
      .catch((e) => toast.error(e.message))
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
        <h1 style={{ margin: '8px 0', textAlign: 'center' }}>
          Recuperar contraseña
        </h1>
        <p style={{ textAlign: 'center', marginBottom: '16px' }}>
          Introduce tu correo electrónico y te enviaremos un enlace para que
          vuelvas a entrar en tu cuenta.
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
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
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
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
