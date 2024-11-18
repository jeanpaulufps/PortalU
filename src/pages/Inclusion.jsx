import { useContext, useEffect, useState } from 'react';
import Segment from '../components/Segment';
import MainLayout from '../layouts/MainLayout';
import { weekDays } from './ClassSchedule';
import { AuthContext } from '../context/AuthProvider';
import { enrollSubject, getNoEnrolledSubject } from '../services/subjects';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Inclusion = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getNoEnrolledSubject(user.id).then((data) => setSubjects(data));
  }, []);

  const handleMatricular = (subjectId) => {
    setLoading(true);
    enrollSubject(user.id, subjectId)
      .then((res) => {
        const newSubjects = [...subjects];
        const index = newSubjects.findIndex((it) => it.id === subjectId);
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
        toast.success('Materia matriculada con exito');
      })
      .catch((e) => toast.error('Ha ocurrido un error'))
      .finally(() => setLoading(false));
  };

  const formatTime = (timeString) => {
    const [hour, ,] = timeString.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour} ${period}`;
  };

  return (
    <MainLayout>
      <Segment title="Inclusión Materias">
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                }}
              >
                Código
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                }}
              >
                Nombre
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                }}
              >
                Horario
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                }}
              >
                Créditos
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                }}
              >
                Intensidad horaria
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                }}
              >
                Cupos
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'center',
                  borderBottom: '1px solid #ddd',
                }}
              >
                Matricular
              </th>
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
              subjects.map((materia) => (
                <tr key={materia.codigo}>
                  <td
                    style={{ padding: '12px', borderBottom: '1px solid #ddd' }}
                  >
                    {materia.codigo}
                  </td>
                  <td
                    style={{ padding: '12px', borderBottom: '1px solid #ddd' }}
                  >
                    {materia.nombre}
                  </td>
                  <td
                    style={{ padding: '12px', borderBottom: '1px solid #ddd' }}
                  >
                    {materia.horarios.map(
                      (horario, i) =>
                        `${weekDays[horario.dia]} / ${formatTime(
                          horario.horaInicio
                        )} - ${formatTime(horario.horaFin)} ${
                          i !== subjects.length  ? '|' : ''
                        } `
                    )}
                  </td>
                  <td
                    style={{ padding: '12px', borderBottom: '1px solid #ddd' }}
                  >
                    {materia.creditos}
                  </td>
                  <td
                    style={{ padding: '12px', borderBottom: '1px solid #ddd' }}
                  >
                    {materia.codigo}
                  </td>
                  <td
                    style={{ padding: '12px', borderBottom: '1px solid #ddd' }}
                  >
                    {materia.intensidadHoraria}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      borderBottom: '1px solid #ddd',
                    }}
                  >
                    <button
                      style={{
                        background: loading ? '#ccc' : 'green',
                        color: 'white',
                        border: 'none',
                        padding: 4,
                        borderRadius: 4,
                        cursor: loading ? 'not-allowed' : 'pointer',
                      }}
                      disabled={loading}
                      onClick={() => handleMatricular(materia.id)}
                    >
                      Matricular
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Segment>
    </MainLayout>
  );
};

export default Inclusion;
