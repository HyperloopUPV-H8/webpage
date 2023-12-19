import { TitleUnderlined, TitledImageBox } from "../components"
import aboutVideo from "../assets/backgrounds/about.mp4"
import compromiso from "../assets/icons/compromiso.svg"
import innovacion from "../assets/icons/innovacion.svg"
import aprendizaje from "../assets/icons/aprendizaje.svg"
import sostenibilidad from "../assets/icons/sostenibilidad.svg"
import mission from "../assets/media/mission.png"
import vision from "../assets/media/vision.png"
import values from "../assets/media/values.png"
import ehw from "../assets/media/ehw.png"
import ehwBanner from "../assets/media/banner.png"
import podCompetitionLeft from "../assets/media/pod-competition-1.png"
import podCompetitionRight from "../assets/media/pod-competition-2.png"

export const AboutPage = () => {
  return (
    <>
      <div className="about__section section-1">
        <video autoPlay loop muted>
          <source src={aboutVideo} type="video/mp4" />
        </video>
        <h1 className="about__title">Acerca</h1>
      </div>

      <div className="about__section__shadow">
        <section className="about__section section-2">
          <div className="about__mision-vision__container">
            <div className="about__mission">
              <TitledImageBox title="Misión" imageClassName="about__image__box__mission" imageURL={mission} borderColor="orange" imageStyle={
                {
                  width: "40rem",
                  height: "20rem",
                }
              }>
                <p className="about__mission-vision__content">
                  Desarrollar investigación en la universidad a través de la innovación en la tecnología hyperloop con el
                  objetivo de construir un futuro sostenible.
                </p>
              </TitledImageBox>
            </div>
            <div id="about__vision">
              <TitledImageBox title="Visión" imageClassName="about__image__box__vision" imageURL={vision} borderColor="blue" imageStyle={
                {
                  width: "40rem",
                  height: "20rem",
                }
              }>
                <p className="about__mission-vision__content">
                  Diseñar, desarrollar y fabricar tecnología hyperloop escalable, posicionándonos como equipo universitario
                  referente a nivel internacional al solucionar los retos que plantea la tecnología del transporte del futuro.
                </p>
              </TitledImageBox> {/* Vision */}
            </div>
          </div>

          <div id="about__values">
            <TitledImageBox title="Valores" imageClassName="about__image__box__values" imageURL={values} borderColor="multicolor" imageStyle={
              {
                width: "60rem",
                height: "30rem",
              }
            }>
              <div className="about__values__content">
                <div>
                  <div className="about__values__item">
                    <h3><img src={compromiso} /> Compromiso</h3>
                    <p>
                      Un equipo marcado por la lealtad y responsabilidad hacia nuestros miembros, la comunidad universitaria y las empresas que nos apoyan, y con una tenaz dedicación por alcanzar los objetivos que nos impulsan a innovar.
                    </p>
                  </div>
                  <div className="about__values__item">
                    <h3><img src={innovacion} /> Innovación</h3>
                    <p>
                      Fuerza impulsora detrás de Hyperloop UPV. Nos esforzamos por ir más allá de los
                      límites establecidos, explorando nuevas soluciones y tecnologías con el fin de llevar a cabo nuestro
                      proyecto.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="about__values__item">
                    <h3><img src={aprendizaje} /> Aprendizaje</h3>
                    <p>
                      La base de nuestro crecimiento. El desarrollo del talento joven es de vital importancia,
                      es un recurso valioso y esencial en nuestro equipo.
                    </p>
                  </div>
                  <div className="about__values__item">
                    <h3><img src={sostenibilidad} /> Sostenibilidad</h3>
                    <p>
                      Desde el diseño a la implementación, la sostenibilidad es un principio rector en
                      cada fase del proyecto, siendo la eficiencia energética un objetivo prioritario
                    </p>
                  </div>
                </div>
              </div>
            </TitledImageBox> {/* Valores */}
          </div>

        </section>
      </div>{/* about__section__shadow */}

      <section className="about__section section-3">
        <TitleUnderlined text="European Hyperloop Week" color="white"/>
        <div className="about__ehw">
          <div className="about__ehw__description">
            <p>
              En 2019 decidimos embarcarnos con 3 de las mejores universidades europeas (University of Edinburgh,
              Delft University of Technology, ETH Zürich) en un enorme desafío: crear nuestro propio evento de tecnología
              hyperloop en el que poder compartir lo mejor de nuestras ideas y forjar una comunidad alimentada por la visión
              de hacer realidad el hyperloop.
            </p>
            <p>
              <b>
                Así nació la European Hyperloop Week (EHW).<br />
                Se trata de un evento que va más allá de la mera competición ya que se nutre de la curiosidad insaciable de
                estudiantes de gran  talento y del afán de aprender.
              </b>
            </p>
          </div>
          <div className="about__ehw__image">
            <img src={ehw} style={{
              width: "60rem",
              height: "30rem",
            }} />
          </div>
          <div className="about__ehw__banner">
            <img src={ehwBanner} style={{
              width: "40rem",
              height: "65rem",
            }} />
          </div>
        </div>
      </section>

      <section className="about__section section-4">
        <TitleUnderlined text="Hyperloop Competition" color="white"/>
        <div id="about__hyperloop__competition">
          <p className="about__hyperloop__competition__text">
            En 2015 un equipo de 5 chicos de la Universitat Politècnica de València decidieron apuntarse al desafío presentado
            por Space X y competir en la primera competición mundial de hyperloop. Ese primer año, se presentó una propuesta
            conceptual y el equipo universitario se fue hasta California para vivir la experiencia de la competición y acabaron
            ganando múltiples premios.
          </p>
          <p className="about__hyperloop__competition__text">
            A partir del éxito rotundo de lo que hoy conocemos como H1 -THE FUTURE CONCEPT, cada año se fue repitiendo la experiencia
            de desarrollar un modelo de hyperloop para poder presentarlo en las competiciones internacionales y seguir trabajando
            para desarrollar el transporte del futuro.
          </p>
          <div className="about__hyperloop__competition__image-left">
            <img src={podCompetitionLeft} style={{
              width: "70rem",
              height: "40rem",
            }} />
          </div>
          <div className="about__hyperloop__competition__image-right">
            <img src={podCompetitionRight} style={{
              width: "70rem",
              height: "40rem",
            }} />
          </div>
        </div>
      </section>
    </>
  )
}
