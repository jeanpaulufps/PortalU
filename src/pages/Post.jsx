import { useParams } from 'react-router-dom';
import Segment from '../components/Segment';
import MainLayout from '../layouts/MainLayout';
import { useContext, useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { addComment, getPost } from '../services/forums';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthProvider';

function Post({}) {
  const { postId } = useParams();

  const [loading, setLoading] = useState(false);
  const [addingPost, setAddingPost] = useState(false);
  const [post, setPost] = useState({});

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    getPost(postId)
      .then((resp) => setPost(resp))
      .catch(() => toast.error('Ha ocurrido un error'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const [text] = e.target;
    setAddingPost(true);
    addComment(postId, user.id, text.value)
      .then((resp) => {
        toast.success('Comentario creado con éxito');

        setPost((prevState) => {
          const comentarios = [...prevState.comentarios];
          comentarios.push(resp);
          return { ...prevState, comentarios };
        });
      })
      .catch(() => toast.error('Ha ocurrido un error'))
      .finally(() => setAddingPost(false));
  };

  return (
    <MainLayout>
      <Segment title="Publicacion">
        {loading ? (
          <div colSpan={10} style={{ padding: '24px' }}>
            <Loader></Loader>
            <p style={{ textAlign: 'center' }}>Cargando...</p>
          </div>
        ) : (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid #ccc',
                paddingBottom: '8px',
                marginBottom: '8px',
              }}
            >
              <div>
                <h2>Titulo: {post.titulo} </h2>
                <p>{post.contenido}</p>
              </div>
              <p>fecha: {new Date(post.fecha_creacion).toLocaleString()}</p>
            </div>
            <div>
              <h3>Comentarios</h3>
              <ul>
                {post.comentarios?.length > 0 ? (
                  post.comentarios.map((comentario) => (
                    <li
                      style={{
                        background: '#eee',
                        padding: '8px',
                        borderRadius: '6px',
                        margin: '8px 0px',
                      }}
                      key={comentario.id}
                    >
                      <div>
                        <h4>
                          {comentario.estudiante} -{' '}
                          {new Date(comentario.fecha_creacion).toLocaleString()}
                        </h4>
                        <p>{comentario.contenido}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <h4
                    style={{
                      padding: '10px 20px',
                      background: '#ccc',
                      margin: '20px 10px',
                    }}
                  >
                    No hay comentatios aún, sé el primero en comentar
                  </h4>
                )}
              </ul>

              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <textarea
                  rows={4}
                  style={{ flexGrow: 1, padding: '8px' }}
                  type="text"
                  name=""
                  placeholder="Agregar un comentario..."
                  id=""
                />
                <input
                  disabled={addingPost}
                  className="add-post-btn"
                  type="submit"
                  value="Enviar"
                />
              </form>
            </div>
          </>
        )}
      </Segment>
    </MainLayout>
  );
}

export default Post;
