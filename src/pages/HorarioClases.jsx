import React, { useEffect, useState } from 'react';
import Segment from '../components/Segment';
import MainLayout from '../layouts/MainLayout';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function HorarioClases() {
  const [horario, setHorario] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await fetch('http://tu-api-url/horarios/'); // Cambia esto por la URL adecuada
        const data = await response.json();
        const formattedHorario = formatHorarioData(data);
        setHorario(formattedHorario);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching horarios:', error);
        setLoading(false);
      }
    };

    fetchHorarios();
  }, []);

  const formatHorarioData = (data) => {
    // Formatea los datos aquí para agruparlos por horas y días
    const horarioPorHoras = [];
    for (let i = 0; i < 24; i++) { // Suponiendo que cada hora tiene una representación en el horario
      const clase = {
        hora: `${i}:00-${i + 1}:00`,
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        sabado: '',
      };

      data.forEach(entrada => {
        const horaInicio = new Date(`${entrada.horaInicio}`).getHours();
        const horaFin = new Date(`${entrada.horaFin}`).getHours();
        
        if (horaInicio === i) {
          switch (entrada.dia) {
            case 1: clase.lunes = entrada.materia; break;
            case 2: clase.martes = entrada.materia; break;
            case 3: clase.miercoles = entrada.materia; break;
            case 4: clase.jueves = entrada.materia; break;
            case 5: clase.viernes = entrada.materia; break;
            case 6: clase.sabado = entrada.materia; break;
            default: break;
          }
        }
      });
      horarioPorHoras.push(clase);
    }
    
    return horarioPorHoras;
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getBackgroundColor = () => {
    return getRandomColor(); // Genera un color aleatorio
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

  if (loading) return <div>Cargando...</div>;

  return (
    <MainLayout>
      <Segment title="Horario de Clases">
        <div id="horarioTabla">
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#f0f4f8', color: '#333', padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold' }}>Hora</th>
                <th style={{ backgroundColor: '#f0f4f8', color: '#333', padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold' }}>Lunes</th>
                <th style={{ backgroundColor: '#f0f4f8', color: '#333', padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold' }}>Martes</th>
                <th style={{ backgroundColor: '#f0f4f8', color: '#333', padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold' }}>Miércoles</th>
                <th style={{ backgroundColor: '#f0f4f8', color: '#333', padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold' }}>Jueves</th>
                <th style={{ backgroundColor: '#f0f4f8', color: '#333', padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold' }}>Viernes</th>
                <th style={{ backgroundColor: '#f0f4f8', color: '#333', padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold' }}>Sábado</th>
              </tr>
            </thead>
            <tbody>
              {horario.map((clase, index) => (
                <tr key={index}>
                  <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>{clase.hora}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                    {clase.lunes && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '60px', backgroundColor: getBackgroundColor(), color: '#333', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.85em', textAlign: 'center', padding: '0px 8px' }}>
                        {clase.lunes}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                    {clase.martes && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '60px', backgroundColor: getBackgroundColor(), color: '#333', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.85em', textAlign: 'center', padding: '0px 8px' }}>
                        {clase.martes}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                    {clase.miercoles && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '60px', backgroundColor: getBackgroundColor(), color: '#333', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.85em', textAlign: 'center', padding: '0px 8px' }}>
                        {clase.miercoles}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                    {clase.jueves && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '60px', backgroundColor: getBackgroundColor(), color: '#333', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.85em', textAlign: 'center', padding: '0px 8px' }}>
                        {clase.jueves}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                  {clase.viernes && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '60px', backgroundColor: getBackgroundColor(), color: '#333', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.85em', textAlign: 'center', padding: '0px 8px' }}>
                        {clase.viernes}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                    {clase.sabado && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '60px', backgroundColor: getBackgroundColor(), color: '#333', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.85em', textAlign: 'center', padding: '0px 8px' }}>
                        {clase.sabado}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={downloadPDF}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#4e3f86',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Descargar PDF
        </button>
      </Segment>
    </MainLayout>
  );
}

export default HorarioClases;
