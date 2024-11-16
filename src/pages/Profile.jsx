import { useContext, useEffect, useState } from 'react';
import Segment from '../components/Segment';
import MainLayout from '../layouts/MainLayout';
import * as studentService from '../services/students';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthProvider';
import Loader from '../components/Loader';
import UpdateProfileModal from '../components/UpdateProfileModal';

function Profile() {
  const date = new Date();

  const { user } = useContext(AuthContext);

  const [student, setStudent] = useState({});

  const handleStudent = (data) => {
    setStudent(data);
  };

  useEffect(() => {
    studentService
      .getById(user.id)
      .then((student) => setStudent(student))
      .catch((err) => toast.error('Ha ocurrido un error'));
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
          <h1>Informacion estudiantil</h1>
          <p>
            Consulte su información personal, registro de vehículos y de hijos
          </p>
        </div>
        <time dateTime={date.toUTCString()}>
          {date.toLocaleDateString('es-CO', { dateStyle: 'full' })}
        </time>
      </header>

      <Segment title="Datos personales">
        {Object.keys(student).length < 1 ? (
          <div
            style={{
              minHeight: 200,
              display: 'flex',
              justifyContent: 'center',
              placeContent: 'center',
            }}
          >
            <Loader></Loader>
          </div>
        ) : (
          <>
            {' '}
            <div style={{ display: 'flex', gap: 16 }}>
              <img
                style={{ width: 300, height: 300, padding: '0 50px  ' }}
                src={student.image}
                alt=""
              />
              <table
                style={{
                  width: '100%',
                  borderColor: 'white',
                  borderCollapse: 'collapse',
                }}
              >
                <tbody>
                  <tr>
                    <td className="profile-column-table">Codigo</td>
                    <td className="profile-column-table">{student.codigo}</td>
                  </tr>
                  <tr>
                    <td className="profile-column-table">Tipo documento</td>
                    <td className="profile-column-table">
                      {student.tipoDocumento}
                    </td>
                  </tr>
                  <tr>
                    <td className="profile-column-table">Documento</td>
                    <td className="profile-column-table">
                      {student.numeroDocumento}
                    </td>
                  </tr>
                  <tr>
                    <td className="profile-column-table">Nombres</td>
                    <td className="profile-column-table">{student.nombres}</td>
                  </tr>
                  <tr>
                    <td className="profile-column-table">Apellidos</td>
                    <td className="profile-column-table">
                      {student.apellidos}
                    </td>
                  </tr>
                  <tr>
                    <td className="profile-column-table">Telefono</td>
                    <td className="profile-column-table">{student.telefono}</td>
                  </tr>
                  <tr>
                    <td className="profile-column-table">Celular</td>
                    <td className="profile-column-table">{student.celular}</td>
                  </tr>
                  <tr>
                    <td className="profile-column-table">Dirección</td>
                    <td className="profile-column-table">
                      {student.direccion}
                    </td>
                  </tr>
                  <tr>
                    <td className="profile-column-table">Correo electrónico</td>
                    <td className="profile-column-table">
                      {student.correoElectronico}
                    </td>
                  </tr>
                  <tr>
                    <td className="profile-column-table">
                      Correo electronico institucional
                    </td>
                    <td className="profile-column-table">
                      {student.correoInstitucional}
                    </td>
                  </tr>
                  <tr>
                    <td className="profile-column-table">Fecha ingreso</td>
                    <td className="profile-column-table">
                      {new Date(student.fechaIngreso).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="profile-column-table">Estado</td>
                    <td className="profile-column-table">
                      {student.estadoMatricula}
                    </td>
                  </tr>
                  <tr>
                    <td className="profile-column-table">Nombre carrera</td>
                    <td className="profile-column-table">asdasdasd</td>
                  </tr>
                  <tr>
                    <td className="profile-column-table">
                      Porcentaje creditos aprobados
                    </td>
                    <td className="profile-column-table">123</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <UpdateProfileModal
              userId={user.id}
              handleStudent={handleStudent}
            ></UpdateProfileModal>
          </>
        )}
      </Segment>
    </MainLayout>
  );
}

export default Profile;
