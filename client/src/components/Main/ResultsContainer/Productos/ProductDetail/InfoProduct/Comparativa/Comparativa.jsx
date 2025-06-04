import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Comparativa = ({ jsonData, productData }) => {
  const { t } = useTranslation();
  const chartRef = useRef(null); // Ref para el gráfico

  const data = {
    labels: Array.from({ length: 36 }, (_, i) => i + 1), // Eje X: Huella de carbono (kg CO₂ eq)
    datasets: [
      {
        label: t("Chart.Titulo"),
        data: [0.01, 0.02, 0.04, 0.05, 0.04, 0.03, 0.02, 0.01, 0.02, 0.03, 0.04, 0.05, 0.04, 0.03, 0.02, 0.01, 0.02, 0.03, 0.04, 0.05, 0.04, 0.03, 0.02, 0.01, 0.02, 0.03, 0.04, 0.05, 0.04, 0.03, 0.02, 0.01, 0.02, 0.03, 0.04, 0.05], // Densidad
        borderColor: "#25a488",
        borderWidth: 2,
        fill: false,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: t("Chart.EjeX"),
        },
      },
      y: {
        title: {
          display: true,
          text: t("Chart.EjeY"),
        },
      },
    },
  };

  useEffect(() => {
    return () => {
      // Destruye el gráfico cuando el componente se desmonte
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <section>
        <article>
          <div className="diferencia">
          <h2>{t("Comparativa.Titulo")}</h2>
          <p>The Sange daily cream (400 ml), with a carbon footprint of {jsonData.products_impacts_resume.co2_fingerprint} kg CO₂eq, is below the mean and median, highlighting its lower environmental impact compared to other analyzed products. This reinforces its strengths in energy efficiency, use of recycled packaging materials, and optimized transport, key elements of its sustainable approach.
Despite its advantages, the graph suggests room for improvement in areas such as ingredient selection and end-of-life packaging management, which could further reduce its impact. Overall, Sange daily cream stands as a benchmark in sustainability within the cosmetics industry</p>
          </div>
          <h4>{t("Comparativa.Subtitulo")}</h4>
          <p>La línea azul muestra la distribución de huellas de carbono de muchos productos. Cuanto más alta está la línea, más común es esa huella.</p>
        </article>
        <article>
          <h4>{t("Comparativa.TituloChart")}</h4>
          <div className="chart-container">
 <Line ref={chartRef} data={data} options={options} />
 </div>
        </article>
      </section>
    </>
  );
};

export default Comparativa;
