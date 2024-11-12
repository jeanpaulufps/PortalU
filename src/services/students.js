import { API_URL } from '../constants';

export const getById = (id) => {
  const url = new URL(`${API_URL}/estudiantes/${id}`);

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data);
};

export const getSubjects = (id) => {
  const url = new URL(`${API_URL}/estudiantes/${id}/materias/`);

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data);
};
