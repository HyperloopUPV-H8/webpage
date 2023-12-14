import teamVideo from '../assets/backgrounds/team-video.mp4'
import direction from '../assets/corporative/subsystems/direction.svg'
import hardware from '../assets/corporative/subsystems/hardware.svg'
import firmware from '../assets/corporative/subsystems/firmware.svg'
import software from '../assets/corporative/subsystems/software.svg'
import structuresandmechanisms from '../assets/corporative/subsystems/structures&mechanisms.svg'
import electromagnetics from '../assets/corporative/subsystems/electromagnetics.svg'
import outreach from '../assets/corporative/subsystems/outreach.svg'
import partners from '../assets/corporative/subsystems/partners.svg'
import economics from '../assets/corporative/subsystems/economics.svg'
import { Subsystem } from '../components/Subsystem'
import { SubsystemMembers } from '../components'

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
              image={direction}
            />
            <Subsystem 
              name='Hardware'
              image={hardware}
            />
            <Subsystem 
              name='Firmware'
              image={firmware}
            />
            <Subsystem 
              name='Software'
              image={software}
            />
            <Subsystem 
              name='Structures & Mechanisms'
              image={structuresandmechanisms}
            />
            <Subsystem 
              name='Electromagnetics'
              image={electromagnetics}
            />
            <Subsystem 
              name='Outreach'
              image={outreach}
            />
            <Subsystem
              name='Partners'
              image={partners}
            />
            <Subsystem
              name='Economics'
              image={economics}
            />
          </div>
        </div>
      </section>

      <div className="team__section section__layout">
        <div className="border-shadow left"></div>
        <div className="border-shadow right"></div>
        
        <SubsystemMembers 
          name='Direction'
        />
        <SubsystemMembers 
          name='Hardware' 
        />
        <SubsystemMembers 
          name='Firmware'
        />
        <SubsystemMembers 
          name='Software'
        />
        <SubsystemMembers 
          name='Structures & Mechanisms'
        />
        <SubsystemMembers 
          name='Electromagnetics'
        />
        <SubsystemMembers 
          name='Outreach'
        />
        <SubsystemMembers 
          name='Partners'
        />
        <SubsystemMembers 
          name='Economics' 
        />

      </div>
    </>
  )
}
