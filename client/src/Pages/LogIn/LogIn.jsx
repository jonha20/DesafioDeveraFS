import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const LogIn = ({  }) => {
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
        //"http://localhost:3000/users/login",
        { email, password },
        { withCredentials: true }
      );
      setMessage(request.data.msg);
      if (request.status === 200 && request.data.token) {
        sessionStorage.setItem("access_token", request.data.token);
        navigate("/");
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
    <>
      <main className="login">
        <ToastContainer />
        <h1>Log In</h1>
        <form className="login__form" onSubmit={handleLogIn} autoComplete="on">
          <div className="login__field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login__field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="login__submit" type="submit">
            Log In
          </button>
          {message && <span className="login__message">{message}</span>}
        </form>
        <p className="login__signup">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </main>
    </>
  );
};

export default LogIn;
