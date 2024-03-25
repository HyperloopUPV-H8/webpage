import { Member, SubsystemTitle } from '.';
import TeamMembers from '../meta/team-members.json';

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

export const SubsystemMembers = ({ name }: SubsystemMembersProps) => {
    const cleanName = name
        .replace(/\s/g, '')
        .replace(/&/g, 'and')
        .toLowerCase();

    const team = TeamMembers as TeamMembersType;

    const members = team[cleanName];

    return (
        <section
            className={`team__section subsystem-section ${cleanName}`}
            id={name}
        >
            <div className="section__overlay"></div>
            <SubsystemTitle name={name} />

            <div className="team__members__container">
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
};
