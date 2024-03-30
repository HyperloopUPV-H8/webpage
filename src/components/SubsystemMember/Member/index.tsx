import style from './style.module.scss';

interface MemberProps {
    member: {
        name: string;
        imgUrl: string;
        rol: string;
        linkedin: string;
    };
    lastMember: boolean;
}

export default function Member({ member, lastMember }: MemberProps) {
    return (
        <div
            className={`${style['member__container']} ${
                lastMember ? style['last-member'] : ''
            }`}
        >
            <a
                href={member.linkedin ? member.linkedin : undefined}
                target="_blank"
            >
                <div className={style['member__image']}>
                    <img src={member.imgUrl} alt={`Imagen ${member.name}`} />
                </div>
            </a>

            <div className={style['member__info']}>
                <div className={style['member__info__name']}>
                    <p>{member.name}</p>
                </div>

                {member.rol != 'Member' && (
                    <div className={style['member__info__rol']}>
                        <p>{member.rol}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
