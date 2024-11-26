import { useState } from 'react';
import { updateStudent } from '../services/students';
import toast from 'react-hot-toast';
import { createPost } from '../services/forums';

function CreatePostModal({ userId, forumId, addPost }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const [titulo, contenido] = e.target;

    createPost(forumId, userId, titulo.value, contenido.value)
      .then((post) => {
        addPost(post);
        setOpen(false);
        toast.success('Publicacion creada con exito');
      })
      .catch((e) => toast.error('Ha ocurrido un error'))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <button className="create-post-btn" onClick={() => setOpen(true)}>
        Crear una publicación
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
              Crear publicacion
            </h2>
            <div style={{ padding: 16 }}>
              <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                  <label className="form-label">Titulo</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Contenido</label>
                  <textarea
                    id="content"
                    name="content"
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
                  Crear publicacion
                </button>
              </form>
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default CreatePostModal;
