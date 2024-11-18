import { API_URL } from '../constants';

export const getById = (id) => {
  const url = new URL(`${API_URL}/estudiantes/${id}`);

  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error('Ha ocurrido un error');
      return res.json();
    })
    .then((data) => data);
};




export const updateStudent = (id, direccion, celular, telefono) => {
  const url = new URL(`${API_URL}/estudiantes/${id}/`);

  const formData = new FormData();

  formData.set('direccion', direccion);
  formData.set('celular', celular);
  formData.set('telefono', telefono);

  return fetch(url, { method: 'PATCH', body: formData })
    .then((res) => {
      if (!res.ok) throw new Error('Ha ocurrido un error');
      return res.json();
    })
    .then((data) => data);
};
