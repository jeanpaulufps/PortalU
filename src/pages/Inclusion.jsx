import { useState } from 'react';
import Segment from '../components/Segment';
import MainLayout from '../layouts/MainLayout';

const Inclusion = () => {
  const materias = [
    { codigo: '1155405', nombre: 'TEORÍA DE LA COMPUTACIÓN', horario: 'Mi. 10-12 / Ju. 10-11', creditos: 3, grupo: '1155405-B', cupos: 20 },
    { codigo: '1155504', nombre: 'ARQUITECTURA DE COMPUTADORES', horario: 'Mi. 06-07 / Ju. 06-08', creditos: 3, grupo: '1155504-B', cupos: 15 },
    { codigo: '1155605', nombre: 'BASES DE DATOS', horario: 'Ma. 08-10 / Vi. 08-10', creditos: 3, grupo: '1155605-A', cupos: 10 },
    { codigo: '1155606', nombre: 'PROGRAMACIÓN WEB', horario: 'Ju. 08-10 / Vi. 06-08', creditos: 3, grupo: '1155606-A', cupos: 5 },
    { codigo: '1155609', nombre: 'SEMINARIO INTEGRADOR I', horario: 'Lu. 10-12', creditos: 2, grupo: '1155609-B', cupos: 8 },
    { codigo: '1155714', nombre: 'TRANSFORMACIÓN DIGITAL DE LAS ORGANIZACIONES', horario: 'Ma. 10-13', creditos: 3, grupo: '1155714-A', cupos: 12 },
  ];

  const [selectedMaterias, setSelectedMaterias] = useState({});
  const [message, setMessage] = useState('');

  const handleCheckboxChange = (codigo) => {
    setSelectedMaterias({
      ...selectedMaterias,
      [codigo]: !selectedMaterias[codigo],
    });
  };

  const handleMatricular = () => {
    const materiasSeleccionadas = Object.keys(selectedMaterias).filter(codigo => selectedMaterias[codigo]);
    
    if (materiasSeleccionadas.length > 0) {
      setMessage('Las materias fueron matriculadas correctamente.');
      setSelectedMaterias({});
    } else {
      setMessage('Por favor, selecciona al menos una materia para matricular.');
    }
  };

  return (
    <MainLayout>
      <Segment title="Inclusión Materias">
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Código</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Nombre</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Horario</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Créditos</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Grupo</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Cupos</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Matricular</th>
            </tr>
          </thead>
          <tbody>
            {materias.map(materia => (
              <tr key={materia.codigo}>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{materia.codigo}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{materia.nombre}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{materia.horario}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{materia.creditos}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{materia.grupo}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{materia.cupos}</td>
                <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                  <input
                    type="checkbox"
                    checked={selectedMaterias[materia.codigo] || false}
                    onChange={() => handleCheckboxChange(materia.codigo)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={handleMatricular}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Matricular materias
        </button>

        {message && (
          <div style={{ marginTop: '20px', color: 'green' }}>
            {message}
          </div>
        )}
      </Segment>
    </MainLayout>
  );
}

export default Inclusion;
