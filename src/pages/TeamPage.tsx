import teamVideo from '../assets/backgrounds/team-video.mp4'
import directionNormal from '../assets/corporative/subsystems/directionNormal.png'
import hardwareNormal from '../assets/corporative/subsystems/hardwareNormal.png'
import firmwareNormal from '../assets/corporative/subsystems/firmwareNormal.png'
import softwareNormal from '../assets/corporative/subsystems/softwareNormal.png'
import mechanicsNormal from '../assets/corporative/subsystems/mechanicsNormal.png'
import electromagneticsNormal from '../assets/corporative/subsystems/electromagneticsNormal.png'
import outreachNormal from '../assets/corporative/subsystems/outreachNormal.png'
import partnersNormal from '../assets/corporative/subsystems/partnersNormal.png'
import economicsNormal from '../assets/corporative/subsystems/economicsNormal.png'

import { Subsystem } from '../components/Subsystem'

export const TeamPage = () => {
  return (
    <>
      <section className="team__section section__1">
        <video autoPlay loop muted>
          <source src={teamVideo} type="video/mp4" />
        </video>
        <div id='video-overlay'></div>

        <div className="team__section__subsystems-content">
          <div className="subsystems__title">
            <h1>SUBSISTEMAS</h1>
            <div className='subsystems__title__line'></div>
          </div>

          <div className="subsystems__container">
            <Subsystem 
              name='Direction'
              image={directionNormal}
            />
            <Subsystem 
              name='Hardware'
              image={hardwareNormal}
            />
            <Subsystem 
              name='Firmware'
              image={firmwareNormal}
            />
            <Subsystem 
              name='Software'
              image={softwareNormal}
            />
            <Subsystem 
              name='Mechanisms and Structures'
              image={mechanicsNormal}
            />
            <Subsystem 
              name='Electromagnetics'
              image={electromagneticsNormal}
            />
            <Subsystem 
              name='Outreach'
              image={"https://placekitten.com/200/200"}
            />
            <Subsystem
              name='Partners'
              image={partnersNormal}
            />
            <Subsystem
              name='Economics'
              image={economicsNormal}
            />
          </div>
        </div>
      </section>

      <section className="team__section section__general">
        <div className="border-shadow left"></div>
        <div className="border-shadow right"></div>
      </section>
    </>
  )
}
