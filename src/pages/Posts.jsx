import { Link, useParams, useRoutes } from 'react-router-dom';
import Segment from '../components/Segment';
import MainLayout from '../layouts/MainLayout';
import { useContext, useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { getPosts } from '../services/forums';
import toast from 'react-hot-toast';
import CreatePostModal from '../components/CreatePostModal';
import { AuthContext } from '../context/AuthProvider';

function Posts({}) {
  const { forumId } = useParams();
  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

  const addPost = (post) =>
    setPosts((prevState) => {
      const newPosts = [...prevState];
      newPosts.push(post);
      return newPosts;
    });

  useEffect(() => {
    getPosts(forumId)
      .then((resp) => setPosts(resp))
      .catch(() => toast.error('Ha ocurrido un error'));
  }, []);

  return (
    <MainLayout>
      <Segment
        title="Publicaciones del foro"
        action={
          <CreatePostModal
            forumId={forumId}
            userId={user.id}
            addPost={addPost}
          ></CreatePostModal>
        }
      >
        <ul>
          <ul>
            {posts.length < 1 ? (
              <div colSpan={10} style={{ padding: '24px' }}>
                <Loader></Loader>
                <p style={{ textAlign: 'center' }}>Cargando...</p>
              </div>
            ) : (
              posts.map((post) => (
                <li key={post.id} className="forum-link">
                  <Link to={`/post/${post.id}`}>
                    <h3>
                      {post.titulo} <br />
                    </h3>
                  </Link>
                  <small>Estudiante: {post.estudiante}</small> <br />
                  <small>
                    fecha: {new Date(post.fecha_creacion).toLocaleString()}
                  </small>
                </li>
              ))
            )}
          </ul>
        </ul>
      </Segment>
    </MainLayout>
  );
}

export default Posts;
