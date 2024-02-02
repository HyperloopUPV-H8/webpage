import timelineVideo from "../assets/backgrounds/timeline-video.mp4"
import h1_banner from "../assets/renders/timeline-h1-banner.jpeg"
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
          description="Todo empieza con una gran idea y un grupo de estudiantes con ganas de cambiar el mundo."
          competition="HyperloopPodCompetition"
          awards={[
            "Premio Mejor Diseño de Concepto",
            "Premio Mejor Sistema de Propulsión"
          ]}
        />

        </div>
      </div>
    </div>
  )
}
