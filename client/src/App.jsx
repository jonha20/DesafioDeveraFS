import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import LogIn from "./Pages/LogIn/LogIn";
import SignUp from "./Pages/SignUp/SignUp";
import Form from './Pages/Form/Form';
import Onboarding from "./components/Main/Onboarding/Onboarding";
import { UserContext } from "./context/userContext";
import {jwtDecode} from "jwt-decode";
import Home from "./components/Main/ResultsContainer/ResultsContainer";
import axios from "axios";
import "./i18n";
import "normalize.css";
function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const location = useLocation();

  function useRefreshToken() {
    useEffect(() => {
      const interval = setInterval(async () => {
        try {
          const request = await axios.post(
            "http://localhost:3000/users/refresh-token",
            {},
            { withCredentials: true }
          );
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
      }, 30 * 60 * 1000); // cada 30 minutos

      return () => clearInterval(interval);
    }, []);
  }
  //useRefreshToken();

useEffect(() => {
  //const token = Cookies.get("access_token");
  const token = sessionStorage.getItem("access_token");
  console.log("Token en cookie:", token);
  if (token) {
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (error) {
      console.error("Error decodificando token:", error);
      setUser(null);
    }
  } else {
    setUser(null);
  }
}, [location]); // se ejecuta cada vez que cambie la ruta

  const hideHeader =
    location.pathname === "/login" || location.pathname === "/signup"; //esto oculta el header en las rutas de login y signup

  return (
    <>
     <UserContext.Provider value={{ user }}>
      {!hideHeader && <Header />}   
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/" element={<Main />} />
        <Route path="/form" element={<Form />} />
        <Route path="/home" element={<Home />} />
       

      </Routes>
      {!hideHeader && <Footer />}

      </UserContext.Provider>
      
    </>
  );
}

export default App;
