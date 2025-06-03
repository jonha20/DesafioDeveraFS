import React from "react";

const DetalleCategorias = ({ jsonData, productData }) => {
  return (
    <>
      <section>
        <article>
          <div className="materias-primas-header">
            <h2>Materias Primas</h2>
            <img src="/icons/arrow_circle_right.svg" alt="arrow_circle_righ" />
            {/* <p>{productData.impact_score}</p> */}
          </div>
          <div className="materias-primas-content">
            <p>{jsonData.stage_analysis.raw_materials}</p>
          </div>
        </article>
        <article>
          <div className="materias-primas-header">
            <h2>Fabricacion</h2>
            <img src="/icons/arrow_circle_right.svg" alt="arrow_circle_righ" />
            {/* <p>{productData.impact_score}</p> */}
          </div>
          <div className="fabricacion-content">
            <p>{jsonData.stage_analysis.Manufacturing}</p>
          </div>
        </article>
        <article>
          <div className="materias-primas-header">
            <h2>Transporte</h2>
            <img src="/icons/arrow_circle_right.svg" alt="arrow_circle_righ" />
            {/* <p>{productData.impact_score}</p> */}
          </div>
          <div className="transporte-content">
            <p>{jsonData.stage_analysis.Transport}</p>
          </div>
        </article>
        <article>
          <div className="materias-primas-header">
           <h2>Emabalaje</h2>
            <img src="/icons/arrow_circle_right.svg" alt="arrow_circle_righ" />
            {/* <p>{productData.impact_score}</p> */}
          </div>
          <div className="emabalaje-content">
            <p>{jsonData.stage_analysis.Packaging}</p>
          </div>
        </article>
        <article>
          <div className="materias-primas-header">
            <h2>Uso</h2>
            <img src="/icons/arrow_circle_right.svg" alt="arrow_circle_righ" />
            {/* <p>{productData.impact_score}</p> */}
          </div>
          <div className="uso-content">
            <p>{jsonData.stage_analysis["Use Phase"]}</p>
          </div>
        </article>
        <article>
          <div className="materias-primas-header">
            <h2>Fin de Vida</h2>
            <img src="/icons/arrow_circle_right.svg" alt="arrow_circle_righ" />
            {/* <p>{productData.impact_score}</p> */}
          </div>
          <div className="fin-de-vida-content">
            <p>{jsonData.stage_analysis["End of Life"]}</p>
          </div>
        </article>

      </section>
    </>
  );
};

export default DetalleCategorias;
