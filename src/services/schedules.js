import { API_URL } from "../constants";

export const getSchedule = (id) => {
    const url = new URL(`${API_URL}/estudiantes/${id}/horario/`);
  
    return fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Ha ocurrido un error');
        return res.json();
      })
      .then((data) => data);
  };