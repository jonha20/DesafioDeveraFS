import React from "react";
import { useTranslation } from "react-i18next";

const flags = {
  es: "🇪🇸",
  en: "🇺🇸",
};

const LenguagePicker = () => {
  const { i18n } = useTranslation();

  const handleChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      {Object.entries(flags).map(([lng, flag]) => (
        <button
          key={lng}
          onClick={() => handleChange(lng)}
          style={{
            fontSize: "1.5rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            outline: "none",
          }}
          aria-label={lng}
        >
          {flag}
        </button>
      ))}
    </div>
  );
};

export default LenguagePicker;