import { useEffect, useState } from 'react';
import style from './style.module.scss';
import TierEdit from './TierEdit';

type Props = {
    username: string;
    password: string;
};

export default function PartnersEdit(props: Props) {
    const [metadata, setMetadata] = useState<TierMetadata[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/partners', {
            method: 'GET',
        }).then((response) =>
            response.json().then((body) => setMetadata(body))
        );
    }, [props.username, props.password]);

    return (
        <div className={style.container}>
            {metadata.map((tier) => {
                return <TierEdit key={tier.name} metadata={tier} />;
            })}
            {JSON.stringify(metadata)}
        </div>
    );
}

export type TierMetadata = {
    name: string;
    partners: PartnerMetadata[];
    style: StyleMetadata;
};

export type PartnerMetadata = {
    name: string;
    logo: LogoMetadata;
    webgapeURL: string;
};

export type LogoMetadata = {
    url: string;
    width?: string;
    height?: string;
};

export type StyleMetadata = {
    color: string;
    width: string;
};
