import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
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

function App() {
  const [user, setUser] = useState({});
  const [productsScraped, setProductsScraped] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const checkToken = async () => {
      let token = sessionStorage.getItem("access_token");

      // Espera hasta que el token esté disponible
      while (!token) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Espera 100ms
        token = sessionStorage.getItem("access_token");
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

  const hideHeader =
    location.pathname === "/login" || 
    location.pathname === "/signup" ||
     location.pathname === "/forgot"||
    location.pathname === "/reset-password"



  return (
    <>
      <UserContext.Provider value={{ user, productsScraped, setProductsScraped }}>
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