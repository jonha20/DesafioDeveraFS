import { useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogIn from "./Pages/LogIn/LogIn";
import SignUp from "./Pages/SignUp/SignUp";
import Form from './Pages/Form/Form';
import axios from 'axios';
import "normalize.css";
function App() {
  const navigate = useNavigate();

function useRefreshToken() {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const request = await axios.post("http://localhost:3000/users/refresh-token", {}, { withCredentials: true });
        if (request.status === 200 && request.data.token) {
          // Guarda el nuevo access token donde lo uses (context, state, etc)
         sessionStorage.setItem("access_token", request.data.token);
        }
      } catch (err) {
        console.error("Error refreshing token:", err);
        if (err.response && err.response.status === 401) {
          // Si el refresh token ha expirado, redirige al login
          navigate("/login");
        }
      }
    },30 * 60 * 1000); // cada 30 minutos 

    return () => clearInterval(interval);
  }, []);
}
  useRefreshToken();
  return (
   <>
    <Routes>
          <Route path="/login" element={<LogIn  />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/form" element={<Form />} />
        </Routes>

   </>
  )
}

export default App
