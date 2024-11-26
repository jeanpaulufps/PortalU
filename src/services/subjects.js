import { API_URL } from '../constants';

export const getSubjects = (id) => {
  const url = new URL(`${API_URL}/estudiantes/${id}/materias/`);

  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error('Ha ocurrido un error');
      return res.json();
    })
    .then((data) => data);
};

export const getAserorias = (id) => {
  const url = new URL(`${API_URL}/estudiantes/${id}/materias-con-horarios/`);

  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error('Ha ocurrido un error');
      return res.json();
    })
    .then((data) => data);
};

export const getEnrolledSubject = (id) => {
  const url = new URL(`${API_URL}/estudiantes/${id}/materias/matriculadas/`);

  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error('Ha ocurrido un error');
      return res.json();
    })
    .then((data) => data);
};

export const getNoEnrolledSubject = (id) => {
  const url = new URL(`${API_URL}/estudiantes/${id}/materias/no-matriculadas`);
  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error('Ha ocurrido un error');
      return res.json();
    })
    .then((data) => data);
};

export const enrollSubject = (studentId, subjectId) => {
  const url = new URL(`${API_URL}/incluir-cancelar-materias/`);

  const formData = new FormData();

  formData.set('estudiante_id', studentId);
  formData.set('materia_id', subjectId);

  return fetch(url, { method: 'POST', body: formData })
    .then((res) => {
      if (!res.ok) throw new Error('Ha ocurrido un error');
      return res.json();
    })
    .then((data) => data);
};

export const cancelSubject = (studentId, subjectId) => {
  const url = new URL(`${API_URL}/incluir-cancelar-materias/`);

  const formData = new FormData();

  formData.set('estudiante_id', studentId);
  formData.set('materia_id', subjectId);

  return fetch(url, { method: 'DELETE', body: formData })
    .then((res) => {
      if (!res.ok) throw new Error('Ha ocurrido un error');
      return res.json();
    })
    .then((data) => data);
};
