import timelineVideo from "../assets/backgrounds/timeline-video.mp4"
import h1_banner from "../assets/renders/timeline-h1-banner.jpeg"
import h2_banner from "../assets/renders/timeline-h2-banner.jpeg"
import h3_banner from "../assets/renders/timeline-h3-banner.jpeg"
import h4and5_banner from "../assets/renders/timeline-h4and5-banner.jpeg"
import h6_banner from "../assets/renders/timeline-h6-banner.jpeg"
import h7_banner from "../assets/renders/timeline-h7-banner.jpeg"
import h8_banner from "../assets/renders/timeline-h8-banner.jpeg"
import h1_extra_1 from "../assets/media/timeline-h1-extra-1.jpeg"
import h1_extra_2 from "../assets/media/timeline-h1-extra-2.jpeg"
import h2_extra_1 from "../assets/media/timeline-h2-extra-1.jpeg"
import h2_extra_2 from "../assets/media/timeline-h2-extra-2.jpeg"
import h3_extra_1 from "../assets/media/timeline-h3-extra-1.jpeg"
import h3_extra_2 from "../assets/media/timeline-h3-extra-2.jpeg"
import h4and5_extra_1 from "../assets/media/timeline-h4and5-extra-1.jpeg"
import h4and5_extra_2 from "../assets/media/timeline-h4and5-extra-2.jpeg"
import h4and5_extra_3 from "../assets/media/timeline-h4and5-extra-3.jpeg"
import h6_extra_1 from "../assets/media/timeline-h6-extra-1.jpeg"
import h6_extra_2 from "../assets/media/timeline-h6-extra-2.jpeg"
import h7_extra_1 from "../assets/media/timeline-h7-extra-1.jpeg"
import h7_extra_2 from "../assets/media/timeline-h7-extra-2.jpeg"
import h8_extra_1 from "../assets/media/timeline-h8-extra-1.jpeg"
import h8_extra_2 from "../assets/media/timeline-h8-extra-2.jpeg"
import { TimelineGeneration } from "../components"

export const TimelinePage = () => {
  return (
    <div className="timeline__page">
      <div className="timeline__section section-1">
          <video autoPlay loop muted playsInline>
            <source src={timelineVideo} type="video/mp4" />
          </video>
      </div>

      <div className="timeline__container">
        <div id="timeline-line"></div>
        <div className="timeline__content">
          <h1 className="timeline__title">Timeline</h1>
          <TimelineGeneration
            generation="H1"
            inityear="2015"
            endyear="2016"
            title="THE FUTURE CONCEPT"
            banner={h1_banner}
            color={"#C1531B"}
            extraImages={[
              h1_extra_1,
              h1_extra_2,
            ]}
            description="Todo empieza con una gran idea y un grupo de estudiantes con ganas de cambiar el mundo."
            competition="HyperloopPodCompetition"
            awards={[
              "Premio Mejor Diseño de Concepto",
              "Premio Mejor Sistema de Propulsión"
            ]}
          />

          <TimelineGeneration
            generation="H2"
            inityear="2016"
            endyear="2017"
            title="ATLANTIC II"
            banner={h2_banner}
            color={"#2486A4"}
            extraImages={[
              h2_extra_1,
              h2_extra_2,
            ]}
            description="Superando barreras como el océano Atlántico para colaborar con la universidad de Purdue en crear nuestro primer prototipo tangible."
            competition="HyperloopPodCompetition"
            awards={[
              "Top 8 HPC Space X",
              "Premio Prototipo más potente"
            ]}
          />

          <TimelineGeneration
            generation="H3"
            inityear="2017"
            endyear="2018"
            title="VALENTIA"
            banner={h3_banner}
            color={"#C1531B"}
            extraImages={[
              h3_extra_1,
              h3_extra_2,
            ]}
            description="Simboliza la independencia de Hyperloop UPV, alcanzar el objetivo de realizar un prototipo por nosotros mismos."
            competition="HyperloopPodCompetition"
            awards={[
              "Top 8 HPC Space X",
            ]}
          />
          
          <TimelineGeneration
            generation="H4 & 5"
            inityear="2018"
            endyear="2020"
            title="TURIAN"
            banner={h4and5_banner}
            color={"#2486A4"}
            extraImages={[
              h4and5_extra_1,
              h4and5_extra_2,
              h4and5_extra_3,
            ]}
            description="La potencia hecha prototipo. El caudal de un río comprimido en un prototipo capaz de alcanzar los 400 km/h."
            competition="HyperloopPodCompetition"
            awards={[
              "Top 8 HPC Space X",
              "Premio a la innovación"
            ]}
          />

          <TimelineGeneration
            generation="H6"
            inityear="2020"
            endyear="2021"
            title="IGNIS"
            banner={h6_banner}
            color={"#C1531B"}
            extraImages={[
              h6_extra_1,
              h6_extra_2,
            ]}
            description="El inicio de una era, la llama que inició la pasión por la escalabilidad. El primer prototipo de España en emplear un motor de inducción lineal, capaz de acelerar sin tocar ninguna superficie."
            competition="EuropeanHyperloopWeek"
            awards={[
              "Top 3 en la EHW",
            ]}
          />

          <TimelineGeneration
            generation="H7"
            inityear="2021"
            endyear="2022"
            title="AURAN"
            banner={h7_banner}
            color={"#2486A4"}
            extraImages={[
              h7_extra_1,
              h7_extra_2,
            ]}
            description="La ligereza personalizada, el primer vehículo en el mundo capaz de levitar, y el más premiado de la EHW."
            competition="EuropeanHyperloopWeek"
            awards={[
              "Premio Most Scalable Design",
              "Premio Guiding Award",
              "Premio Ingenuity Award",
              "Premio Thermal Management Award",
            ]}
          />

          <TimelineGeneration
            generation="H8"
            inityear="2021"
            endyear="2022"
            title="KENOS & ATLAS"
            banner={h8_banner}
            color={"#C1531B"}
            extraImages={[
              h8_extra_1,
              h8_extra_2,
            ]}
            description="La potencia hecha prototipo. El caudal de un río comprimido en un prototipo capaz de alcanzar los 400 km/h."
            competition="EuropeanHyperloopWeek"
            awards={[
              "Mención especial a la infraestructura",
            ]}
          />

        </div>
      </div>
    </div>
  )
}
