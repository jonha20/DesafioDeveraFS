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
    <div>
      {Object.entries(flags).map(([lng, flag]) => (
        <button
          key={lng}
          onClick={() => handleChange(lng)}
          aria-label={lng}
        >
          {flag}
        </button>
      ))}
    </div>
  );
};

export default LenguagePicker;