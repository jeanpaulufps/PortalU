import Segment from '../components/Segment';
import MainLayout from '../layouts/MainLayout';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useContext, useEffect, useState } from 'react';
import { getSchedule } from '../services/schedules';
import { AuthContext } from '../context/AuthProvider';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

export const weekDays = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];
const hours = [
  '06:00-07:00',
  '07:00-08:00',
  '08:00-09:00',
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
];
const colors = [
  '#ffdddd',
  '#dfffe3',
  '#ffe3b3',
  '#d0f4ff',
  '#eeddfd',
  '#ffe3e3',
];

function ClassSchedule() {
  const randBgColor = () =>
    colors[Math.round(Math.random() * colors.length - 1)];

  const downloadPDF = () => {
    const input = document.getElementById('horarioTabla');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save('HorarioClases.pdf');
    });
  };

  const { user } = useContext(AuthContext);

  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    getSchedule(user.id)
      .then((data) => setSchedule(data.materias_matriculadas))
      .catch((err) => toast.error('Ha ocurrido un error'));
  }, []);

  const horarioTabla = hours.map((hora) => {
    const [inicio] = hora.split('-');
    const fila = {
      hora,
      ...Object.fromEntries(weekDays.map((dia) => [dia, ''])),
    };

    schedule.forEach((materia) => {
      materia.horarios.forEach((horario) => {
        const horaInicio = horario.horaInicio.substring(0, 5);
        const horaFin = horario.horaFin.substring(0, 5);

        if (
          horario.dia_nombre in fila &&
          horaInicio <= inicio &&
          horaFin > inicio
        ) {
          fila[
            horario.dia_nombre
          ] = `${materia.nombre} ${materia.codigo} - (Aula:${horario.aula})`;
        }
      });
    });

    return fila;
  });

  return (
    <MainLayout>
      <Segment title="Horario de Clases">
        <div id="horarioTabla">
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '20px',
            }}
          >
            <thead>
              <tr>
                <th className="schedule-th">Hora</th>
                <th className="schedule-th">Lunes</th>
                <th className="schedule-th">Martes</th>
                <th className="schedule-th">Miércoles</th>
                <th className="schedule-th">Jueves</th>
                <th className="schedule-th">Viernes</th>
                <th className="schedule-th">Sábado</th>
              </tr>
            </thead>
            <tbody>
              {schedule.length < 1 ? (
                <tr>
                  <td colSpan={10} style={{ padding: '24px' }}>
                    <Loader></Loader>
                    <p style={{ textAlign: 'center' }}>Cargando...</p>
                  </td>
                </tr>
              ) : (
                horarioTabla.map((fila, index) => (
                  <tr key={index}>
                    <td className="schedule-td">{fila.hora}</td>
                    {weekDays.map((dia) => (
                      <td key={dia} className="schedule-td">
                        {fila[dia] && (
                          <span
                            className="subject-box-style"
                            style={{ background: randBgColor() }}
                          >
                            {fila[dia]}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <button onClick={downloadPDF} className="pdf-btn">
          Descargar Horario en PDF
        </button>
      </Segment>
    </MainLayout>
  );
}

export default ClassSchedule;
