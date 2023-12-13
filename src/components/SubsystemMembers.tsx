import { SubsystemTitle } from "."

interface SubsystemMembersProps {
    name: string
}

export const SubsystemMembers = ({name}: SubsystemMembersProps) => {
    
  return (
    <section 
        className={`team__section subsystem-section ${name.replace(/\s/g, '').replace(/&/g, 'and').toLowerCase()}`} 
        id={name}
        >
        <div className="section__overlay"></div>
        <SubsystemTitle name={name} />
    </section>
  )
}
