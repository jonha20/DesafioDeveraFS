import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const notify = (msg, type) => toast[type](msg);
  const navigate = useNavigate();

  const handleRecover = async (e) => {
    e.preventDefault();

       const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
       if (!emailValidation.test(email)) {
      notify("El correo no tiene un formato válido", "error");
      return;
      }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_RENDER_BACKEND_URL}/users/recoverpassword`,
        { email }
      );
  const { message, resetLink } = response.data;

  const url = new URL(resetLink);
  const token = url.searchParams.get("token");

  if (!token) {
    throw new Error("Token inválido o no encontrado");
  }

  notify(message, "success");

  setTimeout(() => {
    navigate(`/reset-password?token=${token}`);
  }, 1000);
} catch (error) {
  console.error(error);
  notify("Error al enviar correo de recuperación", "error");
}

  };

  return (
    <main className="login-page">
      <div className="login-header">
        <div className="devera-logo">
          <img src="/devera.png" alt="devera logo" />
        </div>
      </div>
      <div className="login-center">
        <div className="login-box">
          <h1 className="login-title">Recuperar Contraseña</h1>
          <form className="login-form" onSubmit={handleRecover}>
            <div className="login-field">
              <input
                type="email"
                id="email"
                placeholder="Introduce tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button className="login-submit" type="submit">
              Enviar correo de recuperación
            </button>
            <span className="login-message">{message}</span>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
