
interface SubsystemProps {
    name: string;
    image: string;
}

export const Subsystem = ({name, image}: SubsystemProps) => {
  return (
    <div className="subsystem__container">
        <div className="subsystem__image">
          <a href={`#${name}`}>
            <img src={image} alt={`${name} subsystem`} />
          </a>
        </div>
        <div className="subsystem__name">
          <p>{name}</p>
        </div>
    </div>
  )
}
