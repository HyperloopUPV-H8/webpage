import { useEffect, useState } from 'react';

type SubsystemInfo = {
    name: string;
    members: MemberInfo[];
};

type MemberInfo = {
    name: string;
    imageURL: string;
    role: string;
    socialsURL: string;
};

export const MemberEdit = () => {
    const [subsystems, setSubsystems] = useState<SubsystemInfo[] | null>(null);

    useEffect(() => {
        fetch('http://localhost:8080/members')
            .then((response) => response.json())
            .then((body) => setSubsystems(body));
    }, []);

    if (subsystems == null) {
        return <div>Waiting for data...</div>;
    }

    return (
        <div className="members_edit__page">
            {subsystems.map((subsystem, index) => {
                return (
                    <div
                        key={`${subsystem.name}_${index}`}
                        className="members_edit__subsystem"
                    >
                        <button>-</button>
                        <input type="text" defaultValue={subsystem.name} />
                        {subsystem.members.map((member, index) => {
                            return (
                                <div
                                    key={`${member.name}_${index}`}
                                    className="members_edit__member"
                                >
                                    <button>-</button>
                                    <input
                                        type="text"
                                        defaultValue={member.name}
                                    />
                                    <input
                                        type="text"
                                        defaultValue={member.role}
                                    />
                                    <input
                                        type="text"
                                        defaultValue={member.imageURL}
                                    />
                                    <input
                                        type="text"
                                        defaultValue={member.socialsURL}
                                    />
                                </div>
                            );
                        })}
                        <button>+</button>
                    </div>
                );
            })}
            <button>+</button>
        </div>
    );
};
