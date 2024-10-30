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

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" Component={Login}></Route>
        <Route path="/" Component={Home}></Route>
        <Route path="/profile" Component={Profile}></Route>
        <Route
          path="/RecuperarContraseña"
          Component={RecuperarContraseña}
        ></Route>
        <Route path="/subjects" Component={Subjects}></Route>
        <Route path="/inclusion" Component={Inclusion}></Route>
        <Route path="/HorarioClases" Component={HorarioClases}></Route>
        <Route path="*" Component={NotFound}></Route>
      </Routes>
      <Toaster></Toaster>
    </>
  );
}

export default App;
