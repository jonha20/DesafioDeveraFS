import React from "react";
import { v4 as uuidv4 } from 'uuid';

const Conclusiones = ({ jsonData }) => {
  if (!jsonData?.products_conclusions) return <p>Cargando datos...</p>;

  const { general_summary, strong_points, areas_for_improvement } = jsonData.products_conclusions;

  return (
    <section>
      {/* Resumen General */}
      <article>
        <div className="materias-primas-header">
          <h2>Resumen General</h2>
          <img src="/icons/arrow_circle_right.svg" alt="arrow_icon" />
        </div>
        <div className="materias-primas-content">
          <p>{general_summary}</p>
        </div>
      </article>

      {/* Puntos Fuertes */}
      <article>
        <div className="materias-primas-header">
          <h2>Puntos Fuertes</h2>
          <img src="/icons/arrow_circle_right.svg" alt="arrow_icon" />
        </div>
        <div className="materias-primas-content">
          <ul>
            {strong_points.map((point, index) => (
              <li key={uuidv4()}>{point}</li>
            ))}
          </ul>
        </div>
      </article>

      {/* Áreas de Mejora */}
      <article>
        <div className="materias-primas-header">
          <h2>Áreas de Mejora</h2>
          <img src="/icons/arrow_circle_right.svg" alt="arrow_icon" />
        </div>
        <div className="materias-primas-content">
          <ul>
            {areas_for_improvement.map((area, index) => (
              <li key={uuidv4()}>{area}</li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
};

export default Conclusiones;
