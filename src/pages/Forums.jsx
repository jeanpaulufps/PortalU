import { Link } from 'react-router-dom';
import Segment from '../components/Segment';
import MainLayout from '../layouts/MainLayout';
import { useContext, useEffect, useState } from 'react';
import { getForums } from '../services/forums';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthProvider';
import Loader from '../components/Loader';

function Forums({}) {
  const [forums, setForums] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getForums(user.id)
      .then((resp) => setForums(resp))
      .catch(() => toast.error('Ha ocurrido un error'));
  }, []);

  return (
    <MainLayout>
      <Segment title="Foros disponibles">
        <ul>
          {forums.length < 1 ? (
            <div colSpan={10} style={{ padding: '24px' }}>
              <Loader></Loader>
              <p style={{ textAlign: 'center' }}>Cargando...</p>
            </div>
          ) : (
            forums.map((forum) => (
              <li key={forum.id} className="forum-link">
                <Link to={`/forums/${forum.id}/posts`}>
                  <h3>
                    {forum.titulo} <br />
                  </h3>
                </Link>
                <small>{forum.descripcion}</small>
              </li>
            ))
          )}
        </ul>
      </Segment>
    </MainLayout>
  );
}

export default Forums;
