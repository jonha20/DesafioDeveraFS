import React, { useContext, useState } from "react";
import LenguagePicker from "./LenguagePicker";
import { UserContext } from "../../context/userContext";
import { useTranslation } from "react-i18next";
import { useNavigate, Link, useLocation  } from "react-router-dom";
import axios from "axios";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = () => {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
const location = useLocation();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    try {
      const request = await axios.post(
        "https://desafiodeverafs.onrender.com/users/logout",
        { withCredentials: true }
      );
      if (request.status === 200) {
        sessionStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
    handleMenuClose();
  };

  return (
    <header className="header">
  <div className="header__left">
    <img src="/devera.png" alt="devera logo" className="header__logo" />
  </div>
  <nav className="header__nav">
    <Link to="/Home" className={`header__nav-link${location.pathname === "/" ? " header__nav-link--active" : ""}`}>
      <span className="header__icon"><img src="/icons/home1.svg" alt="home" /></span>
      <span>{t("Inicio")}</span>
    </Link>
    <Link to="/onboarding" className={`header__nav-link${location.pathname === "/onboarding" ? " header__nav-link--active" : ""}`}>
      <span className="header__icon"><img src="/icons/chat.svg" alt="chat" /></span>
      <span>{t("Onboarding")} </span>
    </Link>
  </nav>
 <div className="header__right">
  <span className="header__username header__username--desktop">{user.name}</span>
 <button className="header__menu-trigger" onClick={handleMenuOpen}>
  <img
    src={user.image || "/default-avatar.png"}
    alt={user.name}
    className="header__avatar"
  />
  <div className="header__burger">
    <span />
    <span />
    <span />
  </div>
  
</button>
  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
  <div className="header__menu-links">
    <MenuItem
      component={Link}
      to="/Home"
      onClick={handleMenuClose}
      selected={location.pathname === "/"}
    >
      <span className="header__icon"><img src="/icons/home1.svg" alt="home" /></span>
      <span>{t("Inicio")}</span>
    </MenuItem>
    <MenuItem
      component={Link}
      to="/onboarding"
      onClick={handleMenuClose}
      selected={location.pathname === "/onboarding"}
    >
      <span className="header__icon"><img src="/icons/chat.svg" alt="chat" /></span>
      <span>{t("Onboarding")}</span>
    </MenuItem>
  </div>
  <div className="header__languages">
    <LenguagePicker />
  </div>
  <MenuItem onClick={logout} className="header__logout">
    Logout
  </MenuItem>
</Menu>
</div>
</header>
  );
};

export default Header;