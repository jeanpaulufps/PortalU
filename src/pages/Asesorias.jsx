import Segment from '../components/Segment';
import MainLayout from '../layouts/MainLayout';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { getAserorias } from '../services/subjects';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Asesorias = () => {
  const { user } = useContext(AuthContext);

  const date = new Date();

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getAserorias(user.id)
      .then((resp) => setSubjects(resp))
      .catch(() => toast.error('Ha ocurrido un error'));
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
          <h1>Modulo de asesorias </h1>
          <p>En este modulo podrás solicitar asesorias de tus materias</p>
        </div>
        <time dateTime={date.toUTCString()}>
          {date.toLocaleDateString('es-CO', { dateStyle: 'full' })}
        </time>
      </header>
      <Segment title="Asesorias">
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th className="subject-th">Materia</th>
              <th className="subject-th">Nombre</th>
              <th className="subject-th">Semestre</th>
              <th className="subject-th">Horarios Disponibles</th>
              <th className="subject-th">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {subjects.length < 1 ? (
              <tr>
                <td colSpan={10} style={{ padding: '24px' }}>
                  <Loader></Loader>
                  <p style={{ textAlign: 'center' }}>Cargando...</p>
                </td>
              </tr>
            ) : (
              subjects.map(
                (subject) =>
                  subject.horarios_asesoria.length > 0 && (
                    <tr key={subject.id}>
                      <td className="subject-td">{subject.codigo}</td>
                      <td className="subject-td">{subject.nombre}</td>
                      <td className="subject-td">
                        {Math.round(Math.random() * 9 + 1)}
                      </td>
                      <td className="subject-td">
                        {subject.horarios_asesoria?.map((horario, i) => (
                          <div key={i}>
                            {horario.dia} - {horario.hora_inicio} a{' '}
                            {horario.hora_fin} <br></br> Lugar: {horario.lugar}
                          </div>
                        ))}
                      </td>
                      <td className="subject-td">
                        <button
                          onClick={() =>
                            toast.success('Asesoria solicitada con éxito')
                          }
                          className="update-btn"
                        >
                          Solicitar
                        </button>
                      </td>
                    </tr>
                  )
              )
            )}
          </tbody>
        </table>
      </Segment>
    </MainLayout>
  );
};

export default Asesorias;
