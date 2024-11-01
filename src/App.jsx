import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Profile from './pages/Profile';
import RecuperarContraseña from './pages/RecuperarContraseña';
import Subjects from './pages/Subjects';
import HorarioClases from './pages/HorarioClases';
import { Toaster } from 'react-hot-toast';
import Inclusion from './pages/Inclusion';
import { AuthProvider } from './context/AuthProvider';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/profile', element: <Profile /> },
    { path: '/subjects', element: <Subjects /> },
    { path: '/inclusion-materias', element: <Inclusion /> },
    { path: '/horario-clases', element: <HorarioClases /> },
  ];

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/login" Component={Login}></Route>
          <Route path="/reset-password" Component={RecuperarContraseña}></Route>

          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<PrivateRoute>{route.element}</PrivateRoute>}
            />
          ))}

          <Route path="*" Component={NotFound}></Route>
        </Routes>
      </AuthProvider>
      <Toaster></Toaster>
    </>
  );
}

export default App;
