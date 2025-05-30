import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const LogIn = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const notify = (message, type) => toast[type](message);
  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.post(
       "https://desafiodeverafs.onrender.com/users/login",
        // "http://localhost:3000/users/login",
        { email, password },
        { withCredentials: true }
      );
      setMessage(request.data.msg);
      if (request.status === 200 && request.data.token) {
        sessionStorage.setItem("access_token", request.data.token);
        navigate("/onboarding");
      }
    } catch (error) {
      console.log(error.message);
      if (error.response && error.response.status === 401) {
        notify("Invalid email or password", "error");
      } else {
        notify("An error occurred during login", "error");
      }
    }
  };
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);

 return (
   <main class="login-page">
  <div class="login-header">
    <div class="devera-logo">
      <img src="/devera.png" alt="devera logo" />
    </div>
  </div>
  <div class="login-center">
    <div class="login-box">
      <h1 class="login-title">Entra con tu cuenta</h1>
      <form class="login-form" onSubmit={handleLogIn}>
        <div class="login-field">
          <input
            type="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div class="login-field">
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span class="login-eye">&#128065;</span>
        </div>
        <div class="login-forgot">
          <a href="/forgot">¿Has olvidado la contraseña?</a>
        </div>
        <button class="login-submit" type="submit">
          Comenzar
        </button>
        <span class="login-message">{message}</span>
      </form>
      <div class="login-signup">
        ¿No tienes cuenta de empresa? <a href="/signup">Sign up</a>
      </div>
      <div class="login-legal">
        Al seleccionar <b>Comenzar</b> aceptas automáticamente nuestras
        <a href="/condiciones">Condiciones de servicio</a>,
        <a href="/privacy">Política de Privacidad</a> y
        <a href="/cookies">Política de cookies</a>.
      </div>
    </div>
  </div>
</main>
  );
};

export default LogIn;
