import React, { useState, useEffect} from "react";
import { useNavigate, useLocation} from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
 // const queryParams = new URLSearchParams(location.search);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [checkingToken, setCheckingToken] = useState(true);


  const notify = (msg, type) => toast[type](msg);

  const TOKEN_EXPIRATION_MS = 15 * 60 * 1000; // 15 minutos

useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const tokenFromUrl = queryParams.get("token");

  if (tokenFromUrl) {
    const expiration = Date.now() + TOKEN_EXPIRATION_MS;
    sessionStorage.setItem("resetToken", tokenFromUrl);
    sessionStorage.setItem("resetTokenExpiry", expiration.toString());
    setToken(tokenFromUrl);
   window.history.replaceState(null, "", window.location.pathname);
    setCheckingToken(false);
  } else {
    const storedToken = sessionStorage.getItem("resetToken");
    const expiry = sessionStorage.getItem("resetTokenExpiry");

    if (storedToken && expiry && Date.now() < parseInt(expiry)) {
      setToken(storedToken);
    } else {
      sessionStorage.removeItem("resetToken");
      sessionStorage.removeItem("resetTokenExpiry");
      setToken(null);
    }
    setCheckingToken(false);
  }
}, [location]);

useEffect(() => {
  if (!checkingToken && !token) {
    toast.error("Acceso inválido. Solicita un nuevo correo de recuperación.");
    navigate("/forgot");
  }
}, [checkingToken, token, navigate]);



  const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordValidation =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>@[\\\]^_`{|}~]).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      notify("Las contraseñas no coinciden", "error");
      return;
    }

      if (!emailValidation.test(email)) {
    notify("El correo no tiene un formato válido", "error");
    return;
    }


    if (!passwordValidation.test(password)) {
    notify(
      "La contraseña debe contener al menos una minúscula, una mayúscula, un número y un carácter especial",
      "error"
    );
    return;
    }

    if (!token) {
      notify("Token no disponible. Solicita un nuevo correo de recuperación.", "error");
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
