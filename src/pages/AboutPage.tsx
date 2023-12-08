import { TitledImageBox } from "../components"

export const AboutPage = () => {
  return (
    <>
      <div className="about__section section-1">
        <h1 className="about__title">Acerca</h1>
      </div>

      <div className="about__section section-2">
        <div id="about__mission">
          <TitledImageBox title="Misión" imageURL="https://placekitten.com/400/200" borderColor="orange" imageStyle={
            {
              width: "400px",
              height: "200px",
            }
          }>
            <p className="about__mission__content">
              Desarrollar investigación en la universidad a través de la innovación en la tecnología hyperloop con el
              objetivo de construir un futuro sostenible.
            </p>
          </TitledImageBox>
        </div>
        <div id="about__vision">
          <TitledImageBox title="Visión" imageURL="https://placekitten.com/400/200" borderColor="blue" imageStyle={
            {
              width: "400px",
              height: "200px",
            }
          }>
            <p className="about__vision__content">
              Diseñar, desarrollar y fabricar tecnología hyperloop escalable, posicionándonos como equipo universitario
              referente a nivel internacional al solucionar los retos que plantea la tecnología del transporte del futuro.
            </p>
          </TitledImageBox> {/* Vision */}
        </div>
        <div id="about__values">
          <TitledImageBox title="Valores" imageURL="https://placekitten.com/600/300" borderColor="multicolor" imageStyle={
            {
              width: "600px",
              height: "300px",
            }
          }>
            <div className="about__values__content">
              <p className="about__values__item">
                <b>Compromiso:</b> un equipo marcado por la lealtad y responsabilidad hacia nuestros miembros, la
                comunidad universitaria y las empresas que nos apoyan, y con una tenaz dedicación por alcanzar los
                objetivos que nos impulsan a innovar.
              </p>
              <p className="about__values__item">
                <b>Innovación:</b> fuerza impulsora detrás de Hyperloop UPV. Nos esforzamos por ir más allá de los
                límites establecidos, explorando nuevas soluciones y tecnologías con el fin de llevar a cabo nuestro
                proyecto.
              </p>
              <p className="about__values__item">
                <b>Aprendizaje:</b> la base de nuestro crecimiento. El desarrollo del talento joven es de vital importancia,
                es un recurso valioso y esencial en nuestro equipo.
              </p>
              <p className="about__values__item">
                <b>Sostenibilidad:</b> Desde el diseño a la implementación, la sostenibilidad es un principio rector en
                cada fase del proyecto, siendo la eficiencia energética un objetivo prioritario
              </p>
            </div>
          </TitledImageBox> {/* Valores */}
        </div>
      </div>

      <div className="about__section section-3">
        <h2 className="about__title__underline">European Hyperloop Week</h2>
        <div id="about__ehw">
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
            <img src="https://placekitten.com/600/300" style={{
              width: "600px",
              height: "300px",
            }} />
          </div>
          <div className="about__ehw__banner">
            <img src="https://placekitten.com/300/600" style={{
              width: "300px",
              height: "600px",
            }} />
          </div>
        </div>
      </div>

      <div className="about__section section-4">
        <h2 className="about__title__underline">Hyperloop Pod Competition</h2>
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
            <img src="https://placekitten.com/500/400" style={{
              width: 500,
              height: 400,
            }} />
          </div>
          <div className="about__hyperloop__competition__image-right">
            <img src="https://placekitten.com/500/400" style={{
              width: 500,
              height: 400,
            }} />
          </div>
        </div>
      </div>
    </>
  )
}
