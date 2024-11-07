import { useState } from 'react';
import toast from 'react-hot-toast';
import { API_URL } from '../constants';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!password) {
      toast.error('Escribe la nueva contraseña');
      setLoading(false);
      return;
    }
    if (!repeatPassword) {
      toast.error('Debes escribir la contraseña de nuevo');
      setLoading(false);
      return;
    }

    if (password !== repeatPassword) {
      toast.error('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    const qParams = new URLSearchParams(window.location.search);

    const formData = new FormData();
    formData.append('new_password', password);
    formData.append('uid', qParams.get('uid'));
    formData.append('token', qParams.get('token'));

    fetch(`${API_URL}/password_reset/confirm/`, {
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
      .then((data) => {
        toast.success(
          `${data.message}. en un momento serás redirigido al login`,
          { duration: 5000 }
        );

        setTimeout(() => {
          navigate('/login');
        }, 5000);
      })
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
          Reestablecer contraseña
        </h1>
        <p style={{ textAlign: 'center', marginBottom: '16px' }}>
          Introduce una contraseña segura
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block' }} htmlFor="email">
              Contraseña nueva
            </label>
            <input
              style={{
                padding: '8px 16px',
                display: 'block',
                width: '-webkit-fill-available',
              }}
              placeholder="**********"
              type="password"
              value={password} // Vincular el valor del input al estado
              onChange={(e) => setPassword(e.target.value)} // Actualizar el estado cuando cambia el input
            />
          </div>
          <div>
            <label style={{ display: 'block' }} htmlFor="email">
              Repite la contraseña nueva
            </label>
            <input
              style={{
                padding: '8px 16px',
                display: 'block',
                width: '-webkit-fill-available',
              }}
              placeholder="*********"
              type="password"
              value={repeatPassword} // Vincular el valor del input al estado
              onChange={(e) => setRepeatPassword(e.target.value)} // Actualizar el estado cuando cambia el input
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

export default ResetPassword;
