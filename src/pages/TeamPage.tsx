import teamVideo from '../assets/backgrounds/team-video.mp4'
import directionNormal from '../assets/corporative/subsystems/directionNormal.png'
import hardwareNormal from '../assets/corporative/subsystems/hardwareNormal.png'
import firmwareNormal from '../assets/corporative/subsystems/firmwareNormal.png'
import softwareNormal from '../assets/corporative/subsystems/softwareNormal.png'
import structuresandmechanismsNormal from '../assets/corporative/subsystems/structures&mechanismsNormal.png'
import electromagneticsNormal from '../assets/corporative/subsystems/electromagneticsNormal.png'
import outreachNormal from '../assets/corporative/subsystems/outreachNormal.png'
import partnersNormal from '../assets/corporative/subsystems/partnersNormal.png'
import economicsNormal from '../assets/corporative/subsystems/economicsNormal.png'

import { Subsystem } from '../components/Subsystem'
import { SubsystemMembers, SubsystemTitle } from '../components'

export const TeamPage = () => {
  return (
    <>
      <section className="team__section section-subsystems">
        <video autoPlay loop muted>
          <source src={teamVideo} type="video/mp4" />
        </video>
        <div id='video-overlay'></div>

        <div className="team__section__content subsystems-container">
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
              name='Structures & Mechanisms'
              image={structuresandmechanismsNormal}
            />
            <Subsystem 
              name='Electromagnetics'
              image={electromagneticsNormal}
            />
            <Subsystem 
              name='Outreach'
              image={outreachNormal}
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

      <div className="team__section section__layout">
        <div className="border-shadow left"></div>
        <div className="border-shadow right"></div>
        
        <SubsystemMembers name='Direction' />
        <SubsystemMembers name='Hardware' />
        <SubsystemMembers name='Firmware' />
        <SubsystemMembers name='Software' />
        <SubsystemMembers name='Structures & Mechanisms' />
        <SubsystemMembers name='Electromagnetics' />
        <SubsystemMembers name='Outreach' />
        <SubsystemMembers name='Partners' />
        <SubsystemMembers name='Economics' />

      </div>
    </>
  )
}
