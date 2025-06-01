import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const notify = (msg, type) => toast[type](msg);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      notify("Las contraseñas no coinciden", "error");
      return;
    }

    if (!token) {
      notify("Token no encontrado en la URL", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/users/restorepassword", {
        email,
        newPassword: password,
        token,
      });

      notify(response.data.message || "Contraseña actualizada con éxito", "success");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.error(error);
      notify(
        error.response?.data?.message || "Error al cambiar la contraseña",
        "error"
      );
    } finally {
      setLoading(false);
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
          <h1 className="login-title">Cambiar Contraseña</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <input
                type="email"
                placeholder="Tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login-field">
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="login-field">
              <input
                type="password"
                placeholder="Confirmar nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <button className="login-submit" type="submit" disabled={loading}>
              {loading ? "Cambiando..." : "Cambiar contraseña"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default ResetPassword;
