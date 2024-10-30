import { useState } from 'react';
import Segment from '../components/Segment';
import MainLayout from '../layouts/MainLayout';
import { getAverage } from '../helpers';

const Subjects = () => {
  const materias = [
    {
      codigo: '1155405',
      nombre: 'TEORÍA DE LA COMPUTACIÓN',
      creditos: 3,
      grupo: '1155405-B',
      cupos: 20,
      semestre: 9,
      primeraNota: 4.3,
      segundaNota: 2.3,
      terceraNota: 3.5,
      cuartaNota: 0.1,
    },
    {
      codigo: '1155504',
      nombre: 'ARQUITECTURA DE COMPUTADORES',
      creditos: 3,
      grupo: '1155504-B',
      cupos: 15,
      semestre: 3,
      primeraNota: 3.9,
      segundaNota: 2.7,
      terceraNota: 2.2,
      cuartaNota: 1.4,
    },
    {
      codigo: '1155605',
      nombre: 'BASES DE DATOS',
      creditos: 3,
      grupo: '1155605-A',
      cupos: 10,
      semestre: 5,
      primeraNota: 4.0,
      segundaNota: 3.7,
      terceraNota: 3.1,
      cuartaNota: 4.2,
    },
  ];

  const date = new Date();

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
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                }}
              >
                Materia
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
                Matriculada
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
                Semestre
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                }}
              >
                1P
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'center',
                  borderBottom: '1px solid #ddd',
                }}
              >
                2P
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'center',
                  borderBottom: '1px solid #ddd',
                }}
              >
                3P
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'center',
                  borderBottom: '1px solid #ddd',
                }}
              >
                EX
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'center',
                  borderBottom: '1px solid #ddd',
                }}
              >
                DEF
              </th>
            </tr>
          </thead>
          <tbody>
            {materias.map((materia) => (
              <tr key={materia.codigo}>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                  {materia.codigo}
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                  {materia.nombre}
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                  {materia.grupo}
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                  {materia.creditos}
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                  {materia.grupo}
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                  <span
                    style={{
                      background:
                        materia.primeraNota < 3 ? '#dd4b39' : '#00a65a',
                    }}
                    className="burbuja-calificacion"
                  >
                    {materia.primeraNota.toFixed(1) || '-'}
                  </span>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                  <span
                    style={{
                      background:
                        materia.segundaNota < 3 ? '#dd4b39' : '#00a65a',
                    }}
                    className="burbuja-calificacion"
                  >
                    {materia.segundaNota || '-'}
                  </span>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                  <span
                    style={{
                      background:
                        materia.terceraNota < 3 ? '#dd4b39' : '#00a65a',
                    }}
                    className="burbuja-calificacion"
                  >
                    {materia.terceraNota || '-'}
                  </span>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                  <span
                    style={{
                      background:
                        materia.cuartaNota < 3 ? '#dd4b39' : '#00a65a',
                    }}
                    className="burbuja-calificacion"
                  >
                    {materia.cuartaNota || '-'}
                  </span>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                  <span
                    style={{
                      background:
                        getAverage(
                          materia.primeraNota,
                          materia.segundaNota,
                          materia.terceraNota,
                          materia.cuartaNota
                        ) < 3
                          ? 'red'
                          : '#00a65a',
                    }}
                    className="burbuja-calificacion"
                  >
                    {getAverage(
                      materia.primeraNota,
                      materia.segundaNota,
                      materia.terceraNota,
                      materia.cuartaNota
                    ) || '-'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Segment>
    </MainLayout>
  );
};

export default Subjects;
