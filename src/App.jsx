import { FORMULARIO } from './components/Formulario';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState([]);

  return (
    <>
      {user.length > 0 ? <h1>Hola, {user[0]}</h1> : <FORMULARIO setUser={setUser} />}
    </>
  );
}

export default App;
