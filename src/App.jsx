import { Route, Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Profile from './pages/Profile';
import RecuperarContraseña from './pages/RecuperarContraseña';
import InclusionMaterias from './pages/InclusionMaterias';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" Component={Login}></Route>
        <Route path="/" Component={Home}></Route>
        <Route path="/profile" Component={Profile}></Route>
        <Route path="/RecuperarContraseña" Component={RecuperarContraseña}></Route>
        <Route path="/InclusionMaterias" Component={InclusionMaterias}></Route>
        <Route path="*" Component={NotFound}></Route>
      </Routes>
      <Toaster></Toaster>
    </>
  );
}

export default App;
