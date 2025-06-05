import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Si no hay usuario autenticado, redirige a login
  if (!user || !user.id) {
    console.log("No user authenticated, redirecting to login");
    navigate("/login");
  }

  return (
    <>
      
    </>
  );
};

export default Main;