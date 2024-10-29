import React, { useState } from 'react';
import './Formulario.css';

export function FORMULARIO({ setUser }) {
  const [documento, setDocumento] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [codigo, setCodigo] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (documento === "" || contraseña === "" || codigo === "") {
      setError(true);
      return;
    }

    setError(false);
    setUser([documento]);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();

    if (email === "") {
      setError(true);
      return;
    }


    console.log(`Recuperación de contraseña solicitada para: ${email}`);
    
    setError(false);
    setSuccessMessage(`Correo enviado a ${email}. Revisa tu bandeja de entrada para instrucciones.`);
    setEmail("");
  };

  return (
    <div className="background">
      <div className="formulario">
        <h1>AdminU</h1>
        {successMessage ? (
          <p className="success-message">{successMessage}</p>
        ) : (
          !forgotPassword ? (
            <form onSubmit={handleSubmit}>
              <label>Ingresa tus datos para ingresar</label>
              <input
                type="text"
                placeholder="Código"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Documento"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
              />

              <div className="captcha-container">
                <label htmlFor="captcha">No soy un robot</label>
                <input type="checkbox" id="captcha" required />
              </div>
              {error && <p className="error-message">Por favor, completa todos los campos.</p>}
              <button type="submit">Iniciar Sesión</button>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword}>
              <label>Ingresa tu correo electrónico</label>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && <p className="error-message">Por favor, ingresa un correo válido.</p>}
              <button type="submit">Recuperar Contraseña</button>
              <button type="button" onClick={() => setForgotPassword(false)}>Volver</button>
            </form>
          )
        )}

        <div className="footer">
          {!forgotPassword && 
            <a href="#" onClick={() => setForgotPassword(true)}>Olvidaste tu clave?</a>
          }
          <a href="#">Noticias</a>
        </div>
      </div>
    </div>
  );
}
