import { MouseEventHandler } from "react"
import { TitledTextBox } from "../components"
import landingVideo from "../assets/backgrounds/landing-video.mp4"
import kenosRender from "../assets/renders/kenos.png"
import kenosHover from "../assets/renders/kenos-hover.png"
import atlasRender from "../assets/renders/atlas.png"
import atlasHover from "../assets/renders/atlas-hover.png"
import atlasTitle from "../assets/corporative/atlas.svg"
import kenosTitle from "../assets/corporative/kenos.svg"
import arrow from "../assets/icons/arrow.svg"

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
            titleSize="6rem"
            boxColor="white-transparent"
            titleAlign="end"
          />
        </div>
      </section>{/* .section_2 */}

      <section className="landing__section section-3">
        <div className="landing__titled-text-box-2">
          <TitledTextBox 
            title="¿Quién somos?"
            text="En Hyperloop UPV somos un equipo de 50 estudiantes de múltiples disciplinas y áreas de estudio de la Universitat Politècnica de València unidos con el objetivo de diseñar, implementar y perfeccionar la tecnología hyperloop."
            titleSize="6rem"
            boxColor="white-transparent"
            titleAlign="start"
          />
        </div>
      </section>

      <section className="landing__section section-4">
          <video autoPlay loop muted>
            <source src={landingVideo} type="video/mp4" />
          </video>
          <h3 className="what-is-hyperloop__title">¿Qué es hyperloop?</h3>
          <div className="what-is-hyperloop__text">
            <p>La tecnología hyperloop presenta una revolución en la movilidad que podría cambiar la forma en que vivimos, trabajamos y nos desplazamos. Una tecnología disruptiva que ha venido para quedarse y que no solo es el futuro, sino el medio de transporte para llegar a él.</p>
          </div>
      </section>

      <section className="landing__section section-5">
        <div className="title-underlined">
          <h3 className="title-underlined__title">Último prototipo</h3>
          <div className="title-underlined__line"></div>
        </div>
      </section>

      <section className="landing__section section-6">
        <div id="gaussian-blur__1"></div>
        <div className="kenos__container">
          <div className="kenos__render__container">
            <div className="kenos__render__content img-normal">
              <img src={kenosRender} alt="Kénos Vehicle" />
            </div>{/* kenos__render */}
            <div className="kenos__render__content img-hover">
              <img src={kenosHover} alt="Kénos Vehicle" />
            </div>
          </div>
          <div className="prototype__text__container">
            <div className="prototype__text__content">
              <div className="prototype__text__title">
                <img src={kenosTitle} alt="Kenos Title" />
              </div>
              <div className="prototype__text__text">
                <p>
                  Último vehículo desarrollado por Hyperloop UPV. Kénos ha sido el primer vehículo de la competición capaz de levitar y desplazarse al vacío sin ningún rozamiento. Este vehículo cuenta con una arquitectura eléctrica al nivel del estado del arte en el transporte eléctrico, así como los ferrocarriles convencionales. Kénos es lo más cercano que ha visto la competición a un hyperloop completo.
                </p>{/* kenos__text */}
              </div>
            </div>
          </div>
        </div>
        <div className="prototype__footnote footer__kenos">
          <p>
          Kénos es el nombre del dios de la mitología Selknam que le dio forma a la Tierra, de la misma forma en la que nuestro vehículo le da forma al futuro.
          </p>
        </div>
      </section>{/* kenos */}

      <section className="landing__section section-7">
        <div id="gaussian-blur__2"></div>
        <div className="atlas__container">
          <div className="prototype__text__container">
          <div className="prototype__text__content">
            <div className="prototype__text__title">
              <img src={atlasTitle} alt="Atlas Title" />
            </div>
            <div className="prototype__text__text">
              <p>
                Atlas es el nombre de la infraestructura de Hyperloop UPV. Se trata de un tubo de acero inoxidable de 10 metros de longitud y 864 mm de diámetro dividido en secciones de 1.5 metros, con un peso total de 12 toneladas. Está completamente adaptado al vacío, siendo la primera cámara de vacío seccionable y portátil que se ha visto en la competición. Además, sus soportes regulables le permiten hacer frente a cualquier terreno sin perder la alineación.
              </p>
            </div>{/* atlas__text */}
          </div>
          </div>
          <div className="atlas__render__container">
            <div className="atlas__render__content img-normal">
              <img src={atlasRender} alt="Atlas Tube" />
            </div>{/* atlas__render */}
            <div className="atlas__render__content img-hover">
              <img src={atlasHover} alt="Atlas Tube" />
            </div>
          </div>
        </div>
        <div className="prototype__footnote">
          <p>
          Atlas le debe el nombre al titán condenado a sujetar el mundo por toda la eternidad. Atlas es también la única vertebra distinta con la función de sujetar el peso de nuestro cerebro. Atlas es  sinónimo de fuerza y seguridad.
          </p>
        </div>
      </section>{/* atlas */}

      <section className="landing__section section-8">

        <div className="news__section__container">

          <div className="title__container">
            <div className="title-underlined">
              <h3 className="title-underlined__title-black">Últimas noticias</h3>
            <div/>
              <div className="title-underlined__line-black"></div>
            </div>
          </div>{/* title */}
    
          <div className="news__container">
    
                <div className="new__container">
                  <div className="new__title">
                    <p>Noticias PREMIUM</p>
                  </div>
    
                  <a href="https://www.upv.es/noticias-upv/noticia-14191-hyperloop-2023-es.html" target="_blank">
                    <div className="new__image premium"></div>
                  </a>
    
                  <div className="new__footer">
                    <a href="https://www.upv.es/noticias-upv/noticia-14191-hyperloop-2023-es.html" target="_blank">
                      <div className="new__footer__container">
                        <p>Leer Más</p>
                        <img src={arrow} alt="Arrow right" />
                      </div>
                    </a>
                  </div>
                </div>{/* new premium */}
    
                <div className="new__container">
                  <div className="new__title">
                    <p>Noticias GOLD</p>
                  </div>
    
                  <a href="https://www.mudinmar.com/es/noticias/mudinmar-participa-european-hyperloop-week/" target="_blank">
                    <div className="new__image gold"></div>
                  </a>
    
                  <div className="new__footer">
                    <a href="https://www.mudinmar.com/es/noticias/mudinmar-participa-european-hyperloop-week/" target="_blank">
                      <div className="new__footer__container">
                        <p>Leer Más</p>
                        <img src={arrow} alt="Arrow right" />
                      </div>
                    </a>
                  </div>
                </div>{/* new gold */}
    
                <div className="new__container">
                  <div className="new__title">
                    <p>Noticias SILVER</p>
                  </div>
    
                  <a href="https://www.linkedin.com/posts/power-electronics_movilidad-sostenible-inversi%C3%B3n-activity-7072859290838941696-gPnn/?originalSubdomain=pe" target="_blank">
                    <div className="new__image silver"></div>
                  </a>
    
                  <div className="new__footer">
                    <a href="https://www.linkedin.com/posts/power-electronics_movilidad-sostenible-inversi%C3%B3n-activity-7072859290838941696-gPnn/?originalSubdomain=pe" target="_blank">
                      <div className="new__footer__container">
                        <p>Leer Más</p>
                        <img src={arrow} alt="Arrow right" />
                      </div>
                    </a>
                  </div>
                </div>{/* new silver */}
    
            </div>{/* news */}

          </div>

      </section>
    </>
  )
}
