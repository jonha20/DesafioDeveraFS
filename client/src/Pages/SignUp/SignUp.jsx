import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const notify = (message, type) => toast[type](message); // Función para mostrar notificaciones

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Validación manual antes de enviar
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordValidation =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>@[\\\]^_`{|}~]).{8,}$/;

    let regex = true;

    if (!emailValidation.test(email)) {
      notify("Email must have a valid format", "error");
      regex = false;
    }

    if (!passwordValidation.test(password)) {
      notify(
        "Password must contain lowercase, uppercase, digit and special character",
        "error"
      );
      regex = false;
    }

    if (!regex) return; // Bloquea el submit si hay errores
    try {
      const request = await axios.post(
       `${import.meta.env.VITE_RENDER_BACKEND_URL}/users/register`,
       //  "http://localhost:3000/users/register",
        { name, email, password },
        { withCredentials: true }
      );
      setMessage(request.data.msg);
      if (request.status === 201) {
        notify("Registration successful", "success");
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
      if (error.response && error.response.status === 409) {
        notify("Email already registered", "error");
      } else {
        notify("An error occurred during registration", "error");
      }
    }
  };

 return (
    <main className="signup-page">
      <ToastContainer />
      <div className="signup-header">
        <div className="devera-logo">
          <img src="/devera.png" alt="devera logo" />
        </div>
      </div>
      <div className="signup-center">
        <div className="signup-box">
          <h1 className="signup-title">Regístrate</h1>
          <form
            className="signup-form"
            onSubmit={handleSignUp}
            autoComplete="on"
          >
            <div className="signup-field">
              <input
                type="text"
                id="username"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nombre completo"
                required
                autoComplete="username"
              />
            </div>
            <div className="signup-field">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                required
                autoComplete="email"
              />
            </div>
            <div className="signup-field">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
                autoComplete="new-password"
              />
            </div>
            <button className="signup-submit" type="submit">
              Registrarse
            </button>
          </form>
          {message && <span className="signup-message">{message}</span>}
          <div className="signup-login">
            ¿Tienes cuenta de Empresa? <a href="/login">Inicia Sesión</a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
