
interface MemberProps {
    member: {
        name: string,
        imgUrl: string,
        rol: string,
        linkedin: string,
    }
}

export const Member = ({member}: MemberProps) => {
  return (
    <div className="member__container">
        
        {member.linkedin != "" ? (
            <a href={member.linkedin} target="_blank">
                <div className="member__image">
                    <img src={member.imgUrl} alt={`Imagen ${member.name}`} />
                </div>
            </a>
        ) : (
            <a>
                <div className="member__image">
                    <img src={member.imgUrl} alt={`Imagen ${member.name}`} />
                </div>
            </a>
        )}

        <div className="member__info">

            <div className="member__info__name">
                <p>{member.name}</p>
            </div>


            {member.rol != "Member" && (
                <div className="member__info__rol">
                    <p>{member.rol}</p>
                </div>
            )}
            
            
        </div>
    </div>
  )
}
