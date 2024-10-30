import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Segment from '../components/Segment';
import MainLayout from '../layouts/MainLayout';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function HorarioClases() {
  const horario = [
    { hora: '06:00-07:00', lunes: '', martes: '', miercoles: 'Arquitectura de computadores - B', jueves: 'Arquitectura de computadores - B', viernes: 'Programación web - A', sabado: '' },
    { hora: '07:00-08:00', lunes: '', martes: '', miercoles: '', jueves: 'Arquitectura de computadores - B', viernes: 'Programación web - A', sabado: '' },
    { hora: '08:00-09:00', lunes: '', martes: 'Bases de datos - A', miercoles: '', jueves: 'Programación web - A', viernes: 'Bases de datos - A', sabado: '' },
    { hora: '09:00-10:00', lunes: '', martes: 'Bases de datos - A', miercoles: '', jueves: 'Programación web - A', viernes: 'Bases de datos - A', sabado: '' },
    { hora: '10:00-11:00', lunes: 'Seminario integrador II - B', martes: 'Transformación digital de las organizaciones - A', miercoles: 'Teoría de la computación - B', jueves: 'Teoría de la computación - B', viernes: '', sabado: '' },
    { hora: '11:00-12:00', lunes: 'Seminario integrador II - B', martes: 'Transformación digital de las organizaciones - A', miercoles: 'Teoría de la computación - B', jueves: '', viernes: '', sabado: '' },
    { hora: '12:00-13:00', lunes: '', martes: 'Transformación digital de las organizaciones - A', miercoles: '', jueves: '', viernes: '', sabado: '' },
  ];

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle = {
    backgroundColor: '#f0f4f8',
    color: '#333',
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'center',
    fontWeight: 'bold',
  };

  const tdStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'center',
  };

  const subjectBoxStyle = (backgroundColor) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '120px',
    height: '60px',
    backgroundColor: backgroundColor || '#fff',
    color: '#333',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '0.85em',
    textAlign: 'center',
    padding: '8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    lineHeight: '1.2em',
  });

  const getBackgroundColor = (materia) => {
    switch (materia) {
      case 'Arquitectura de computadores - B':
        return '#ffdddd';
      case 'Bases de datos - A':
        return '#dfffe3';
      case 'Programación web - A':
        return '#ffe3b3';
      case 'Teoría de la computación - B':
        return '#d0f4ff';
      case 'Transformación digital de las organizaciones - A':
        return '#eeddfd';
      case 'Seminario integrador II - B':
        return '#ffe3e3';
      default:
        return '#fff';
    }
  };

  const downloadPDF = () => {
    const input = document.getElementById('horarioTabla');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0); // Ajuste de posición y tamaño en el PDF
      pdf.save('HorarioClases.pdf');
    });
  };

  return (
    <MainLayout>
      <Segment title="Horario de Clases">
        <div id="horarioTabla">
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Hora</th>
                <th style={thStyle}>Lunes</th>
                <th style={thStyle}>Martes</th>
                <th style={thStyle}>Miércoles</th>
                <th style={thStyle}>Jueves</th>
                <th style={thStyle}>Viernes</th>
                <th style={thStyle}>Sábado</th>
              </tr>
            </thead>
            <tbody>
              {horario.map((clase, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{clase.hora}</td>
                  <td style={tdStyle}>{clase.lunes && <span style={subjectBoxStyle(getBackgroundColor(clase.lunes))}>{clase.lunes}</span>}</td>
                  <td style={tdStyle}>{clase.martes && <span style={subjectBoxStyle(getBackgroundColor(clase.martes))}>{clase.martes}</span>}</td>
                  <td style={tdStyle}>{clase.miercoles && <span style={subjectBoxStyle(getBackgroundColor(clase.miercoles))}>{clase.miercoles}</span>}</td>
                  <td style={tdStyle}>{clase.jueves && <span style={subjectBoxStyle(getBackgroundColor(clase.jueves))}>{clase.jueves}</span>}</td>
                  <td style={tdStyle}>{clase.viernes && <span style={subjectBoxStyle(getBackgroundColor(clase.viernes))}>{clase.viernes}</span>}</td>
                  <td style={tdStyle}>{clase.sabado && <span style={subjectBoxStyle(getBackgroundColor(clase.sabado))}>{clase.sabado}</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={downloadPDF} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Descargar Horario en PDF
        </button>
      </Segment>
    </MainLayout>
  );
}

export default HorarioClases;
