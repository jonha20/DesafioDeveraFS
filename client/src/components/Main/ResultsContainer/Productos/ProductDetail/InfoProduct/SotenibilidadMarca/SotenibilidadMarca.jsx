import React from "react";
import { useTranslation } from "react-i18next";

const SotenibilidadMarca = () => {
  const { t } = useTranslation();
  return (
    <>
      <section>
        <article>
          <div className="materias-primas-header">
          <h2>{t("SostenibilidadDeLaMarca.Titulo")}</h2>
          <img src="/icons/arrow_circle_right.svg" alt="arrow_circle_right" />
          <b>80/100</b>
          </div>
          <p>
            Sange, a brand with over 60 years of history, integrates
            sustainability as a core aspect of its operations. Its efforts
            reflect the holistic philosophy of its founder, Sebastian Sange,
            with notable initiatives and areas for improvement.<br/><br/> 

            Positive aspects<br/><br/> 

            Sange has earned the EcoVadis Platinum rating, placing it among the
            top 1% of companies globally for sustainability. It also holds EMAS,
            ISO14001, GMP, and HACCP certifications, highlighting its robust
            environmental and quality management practices. Over 50% of the
            energy used in its factories and operations comes from renewable
            sources, showcasing its commitment to reducing its carbon footprint.
            The brand is recognized as a "Green Brand" and has joined the UN
            Global Compact, adhering to principles of human rights, labor
            standards, environmental protection, and anti-corruption.<br/><br/> 
            
            In product
            development, Sange emphasizes natural ingredients, avoiding
            preservatives and synthetic additives when possible. It employs
            plant-based emulsifiers and natural oils, exceeding legal
            requirements in safety and sustainability. Packaging innovation is
            another focus, with goals to eliminate petroleum-based plastics by
            2025. The introduction of bio-based materials, such as Paper Blend,
            demonstrates a shift toward eco-friendly solutions. Distribution
            from Germany to Spain (1.800 km) employs EURO6-compliant trucks,
            achieving reasonable efficiency with a transportation impact of only
            0,14 kg CO₂eq per functional unit. Additionally, the company
            supports social projects through partnerships, such as with
            "innatura," and has made monetary and material donations for flood
            and war victims.<br/><br/> 
            
            Areas for improvement<br/><br/> 
            
            Sange could enhance its
            sustainability by addressing Scope 3 emissions (indirect emissions
            across the supply chain), which remain underreported. Comprehensive
            disclosure in this area would provide a fuller understanding of its
            environmental impact. Metrics on the gender pay gap are currently
            unclear, leaving room for improved transparency. Furthermore,
            acquiring certifications like B Corp could further validate its
            sustainability efforts.<br/><br/> 
            
            Recommendations<br/><br/> 
            
            To improve, Sange could
            increase supply chain transparency by assessing and disclosing
            suppliers’ environmental and social practices. Strengthening gender
            pay gap reporting and implementing measures to close any disparities
            would support equality goals. Engaging employees in sustainability
            initiatives would foster a stronger culture of responsibility.
            Educating consumers on the environmental impact of its products
            could also encourage sustainable consumption. <br/><br/> 
            
            By addressing these
            areas, Sange can further align with global environmental and social
            goals, solidifying its position as a leader in sustainability.
          </p>
        </article>
      </section>
    </>
  );
};

export default SotenibilidadMarca;
