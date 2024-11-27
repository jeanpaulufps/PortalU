import { useEffect, useState } from 'react';
import Segment from '../components/Segment';
import MainLayout from '../layouts/MainLayout';

const Calendar = () => {
  const date = new Date();

  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hacer la solicitud a la API
    fetch('http://localhost:8000/api/eventos/') // Cambia la URL si es necesario
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then((data) => {
        setEventos(data); // Guardar los datos en el estado
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar los eventos:', error);
        setLoading(false);
      });
  }, []);

  return (
    <MainLayout>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h1>Calendario academico</h1>
          <p>Calendario del semestre actual</p>
        </div>
        <time dateTime={date.toUTCString()}>
          {date.toLocaleDateString('es-CO', { dateStyle: 'full' })}
        </time>
      </header>
      <Segment title="Asesorias">
        <table className="calendar-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Fecha de Inicio</th>
              <th>Fecha de Fin</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento) => (
              <tr key={evento.id}>
                <td>{evento.id}</td>
                <td>{evento.titulo}</td>
                <td>{evento.descripcion}</td>
                <td>{new Date(evento.fecha_inicio).toLocaleString()}</td>
                <td>{new Date(evento.fecha_fin).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Segment>
    </MainLayout>
  );
};

export default Calendar;
