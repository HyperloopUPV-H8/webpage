import { TitledTextBox } from "../components"

export const LandingPage = () => {
  return (
    <>
      <div className="landing__section section-1">

      </div>

      <section className="landing__section section-2">
        <div className="landing__titled-text-box-1">
          <TitledTextBox 
            title="¿Qué hacemos?"
            text="Nuestra trayectoria de casi una década destaca por una combinación única de innovación, creatividad y dedicación. Cada temporada nos enfrentamos al enorme reto de crear un vehículo nuevo, incorporando nuevas ideas y mejorando año a año. Para ello trabajamos en estrecha colaboración con las empresas que nos apoyan, aprovechando la diversidad de talento y perspectivas que tenemos para abordar de forma efectiva los desafíos técnicos y logísticos que presenta hyperloop."
          />
        </div>
      </section>

      <section className="landing__section section-3">
        <div className="landing__titled-text-box-2">
          <TitledTextBox 
            title="¿Quién somos?"
            text="En Hyperloop UPV somos un equipo de 50 estudiantes de múltiples disciplinas y áreas de estudio de la Universitat Politècnica de València unidos con el objetivo de diseñar, implementar y perfeccionar la tecnología hyperloop."
          />
        </div>
      </section>

      {/* <video src="/assets/backgrounds/landing-4-video.jpeg">

      </video> */}

      <section className="landing__section section-5">
        
      </section>
    </>
  )
}
