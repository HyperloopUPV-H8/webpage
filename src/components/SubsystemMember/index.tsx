import TeamMembers from '../../meta/team-members.json';
import Member from './Member';
import SubsystemTitle from './Title';
import style from '../../pages/TeamPage/style.module.scss';

interface TeamMembersType {
    [key: string]: MemberType[];
}

interface MemberType {
    name: string;
    imgUrl: string;
    rol: string;
    linkedin: string;
}

interface SubsystemMembersProps {
    name: string;
}

export default function SubsystemMembers({ name }: SubsystemMembersProps) {
    const cleanName = name
        .replace(/\s/g, '')
        .replace(/&/g, 'and')
        .toLowerCase();

    const team = TeamMembers as TeamMembersType;

    const members = team[cleanName];

    return (
        <section
            className={`${style['team__section']} ${style['subsystem-section']} ${style[cleanName]}`}
            id={name}
        >
            <div className={style['section__overlay']}></div>
            <SubsystemTitle name={name} />

            <div className={style['team__members__container']}>
                {members.map((member, index) => {
                    if (
                        index == members.length - 1 &&
                        members.length % 2 == 1
                    ) {
                        return (
                            <Member
                                key={member.name}
                                member={member}
                                lastMember={true}
                            />
                        );
                    }
                    return (
                        <Member
                            key={member.name}
                            member={member}
                            lastMember={false}
                        />
                    );
                })}
            </div>
        </section>
    );
}
