import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <aside
      style={{
        height: '100%',
        width: 230,
        position: 'absolute',
        borderRight: '1px solid #d2d6de',
      }}
    >
      <nav>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontWeight: 'bolder',
            padding: '12px 16px',
          }}
        >
          <img
            style={{ width: 60, height: 60 }}
            src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
            alt=""
          />
          <span>
            {user.nombres} {user.apellidos}
          </span>
        </div>
        <p style={{ padding: '12px 16px', color: '#848484' }}>
          NAVEGACION PRINCIPAL
        </p>
        <ul>
          <li>
            <Link to="/profile" className="sidebar-link">
              <img src="./profile.svg" alt="" /> Perfil estudiantil
            </Link>
          </li>
          <li>
            <Link to="/subjects" className="sidebar-link">
              Materias
            </Link>
          </li>
          <li>
            <Link to="/inclusion" className="sidebar-link">
              Inclusion Materias
            </Link>
          </li>
          <li>
            <Link to="/cancelacion" className="sidebar-link">
              Cancelacion materias
            </Link>
          </li>
          <li>
            <Link to="/class-schedule" className="sidebar-link">
              Horario de clases
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
