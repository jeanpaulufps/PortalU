import Segment from '../components/Segment';
import MainLayout from '../layouts/MainLayout';
import { getSubjects } from '../services/subjects';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const Subjects = () => {
  const { user } = useContext(AuthContext);

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getSubjects(user.id)
      .then((data) => setSubjects(data.materiasMatriculadas))
      .catch((e) => toast.error('Ha ocurrido un error'));
  }, []);

  const date = new Date();

  const getBubbleBg = (note) => {
    if (!note) return 'gray';

    return note < 3 ? '#dd4b39' : '#00a65a';
  };

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
          <h1>Información Académica </h1>
          <p>
            Consulte sus materias matriculadas, materias no matriculadas, cursos
            de formación y módulos
          </p>
        </div>
        <time dateTime={date.toUTCString()}>
          {date.toLocaleDateString('es-CO', { dateStyle: 'full' })}
        </time>
      </header>
      <Segment title="Materias">
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
              <th className="subject-th">Matriculada</th>
              <th className="subject-th">Créditos</th>
              <th className="subject-th">Semestre</th>
              <th className="subject-th">1P</th>
              <th className="subject-th">2P</th>
              <th className="subject-th">3P</th>
              <th className="subject-th">EX</th>
              <th className="subject-th">DEF</th>
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
              subjects.map((subject) => (
                <tr key={subject.codigo}>
                  <td className="subject-td">{subject.codigo}</td>
                  <td className="subject-td">{subject.nombre}</td>
                  <td className="subject-td">{subject.codigo}</td>
                  <td className="subject-td">{subject.creditos}</td>
                  <td className="subject-td">{subject.codigo}</td>
                  <td className="subject-td">
                    <span
                      style={{
                        background: getBubbleBg(subject.notas[0]?.primera),
                      }}
                      className="burbuja-calificacion"
                    >
                      {subject.notas[0]?.primera.toFixed(1) || '-'}
                    </span>
                  </td>
                  <td className="subject-td">
                    <span
                      style={{
                        background: getBubbleBg(subject.notas[0]?.segunda),
                      }}
                      className="burbuja-calificacion"
                    >
                      {subject.notas[0]?.segunda.toFixed(1) || '-'}
                    </span>
                  </td>
                  <td className="subject-td">
                    <span
                      style={{
                        background: getBubbleBg(subject.notas[0]?.tercera),
                      }}
                      className="burbuja-calificacion"
                    >
                      {subject.notas[0]?.tercera.toFixed(1) || '-'}
                    </span>
                  </td>
                  <td className="subject-td">
                    <span
                      style={{
                        background: getBubbleBg(subject.notas[0]?.cuarta),
                      }}
                      className="burbuja-calificacion"
                    >
                      {subject.notas[0]?.cuarta.toFixed(1) || '-'}
                    </span>
                  </td>
                  <td className="subject-td">
                    <span
                      style={{
                        background: getBubbleBg(subject.notas[0]?.promedio),
                      }}
                      className="burbuja-calificacion"
                    >
                      {subject.notas[0]?.promedio.toFixed(1) || '-'}
                    </span>
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

export default Subjects;
