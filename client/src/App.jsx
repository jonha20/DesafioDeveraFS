import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
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
import ResetPassword from "./Pages/ChangePassword/ChangePassword";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import "./i18n";
import "normalize.css";
import axios from "axios";

function App() {
  const [user, setUser] = useState({});
  const [cookie, setCookie] = useState("");
  const [productsScraped, setProductsScraped] = useState([]);
  const [productoAnalizado, setProductoAnalizado] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      let token = cookie || sessionStorage.getItem("access_token");

      // Espera hasta que el token esté disponible
      while (!token) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Espera 100ms
        token = cookie || sessionStorage.getItem("access_token");
      }

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
    };

    checkToken();
  }, [location]);

useEffect(() => {
  const refreshToken = async () => {
    let token = sessionStorage.getItem("access_token");
    if (token) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_RENDER_BACKEND_URL}/users/refresh-token`,
          { id: user.id },
          {
            withCredentials: true,
          }
        );

        if (response.data.token) {
          sessionStorage.setItem("access_token", response.data.token);
          const decoded = jwtDecode(response.data.token);
          setUser(decoded);
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        setUser(null);
        navigate("/login"); // Redirige al login si falla
      }
    }
  };

  // Configura un intervalo para refrescar el token cada 15 minutos
  const interval = setInterval(() => {
    refreshToken();
  }, 15 * 60 * 1000); // 15 minutos

  // Limpia el intervalo cuando el componente se desmonte
  return () => clearInterval(interval);
}, []);


  const hideHeader =
    location.pathname === "/login" || 
    location.pathname === "/signup" ||
     location.pathname === "/forgot"||
    location.pathname === "/reset-password"



  return (
    <>
      <UserContext.Provider value={{ user, setUser,setCookie, productsScraped, setProductsScraped, productoAnalizado, setProductoAnalizado }}>
        {!hideHeader && <Header />}
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/" element={<Main />} />
          <Route path="/form" element={<Form />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot" element={<ForgotPassword/>} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        {!hideHeader && <Footer />}
      </UserContext.Provider>
    </>
  );
}

export default App;