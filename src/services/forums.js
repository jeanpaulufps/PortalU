import { API_URL } from '../constants';

export const getForums = (id) => {
  const url = new URL(`${API_URL}/foros-estudiante/${id}/`);

  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error('Ha ocurrido un error');
      return res.json();
    })
    .then((data) => data);
};

export const getPosts = (forumId) => {
  const url = new URL(`${API_URL}/publicaciones-foro/${forumId}/`);

  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error('Ha ocurrido un error');
      return res.json();
    })
    .then((data) => data);
};

export const getPost = (postId) => {
  const url = new URL(`${API_URL}/publicacion/${postId}/`);

  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error('Ha ocurrido un error');
      return res.json();
    })
    .then((data) => data);
};
