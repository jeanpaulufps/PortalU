import { useState } from 'react';
import { updateStudent } from '../services/students';
import toast from 'react-hot-toast';

function UpdateProfileModal({ userId, handleStudent }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const [celular, telefono, direccion] = e.target;

    updateStudent(userId, direccion.value, celular.value, telefono.value)
      .then((data) => {
        handleStudent(data);
        setOpen(false);
        toast.success('Datos actualizados con exito');
      })
      .catch((e) => toast.error('Ha ocurrido un error'))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <button className="update-btn" onClick={() => setOpen(true)}>
        Actualizar datos
      </button>

      {open && (
        <div className="modal-wrapper ">
          <main
            style={{
              margin: '16px 0px',
              background: 'white',
              borderTop: '3px solid #000b8b',
              borderRadius: 4,
              minHeight: 200,
              width: '50%',
            }}
          >
            <h2 style={{ padding: 8, borderBottom: '1px solid #d2d6de' }}>
              Actualizar datos
            </h2>
            <div style={{ padding: 16 }}>
              <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                  <label className="form-label">Celular</label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Telefono</label>
                  <input
                    type="text"
                    id="document"
                    name="document"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Direccion</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-input"
                    required
                  />
                </div>
                <button
                  style={{ background: 'gray' }}
                  type="button"
                  className="form-button"
                  onClick={() => setOpen(false)}
                >
                  Cerrar
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className="form-button"
                >
                  Actualizar datos
                </button>
              </form>
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default UpdateProfileModal;
