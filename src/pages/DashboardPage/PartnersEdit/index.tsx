import { useEffect } from 'react';
import style from './style.module.scss';
import TierEdit from './TierEdit';
import { usePartnersStore } from './store';

type Props = {
    username: string;
    password: string;
};

export default function PartnersEdit(props: Props) {
    const metadata = usePartnersStore((state) => state.modifiedMetadata);
    const loadOriginalMetadata = usePartnersStore(
        (state) => state.loadOriginalMetadata
    );

    useEffect(() => {
        fetch('http://localhost:8080/partners', {
            method: 'GET',
        }).then((response) =>
            response.json().then((body) => loadOriginalMetadata(body))
        );
    }, [props.username, props.password]);

    return (
        <div className={style.container}>
            {metadata.map((_, idx) => {
                return <TierEdit key={idx} index={idx} />;
            })}
            {JSON.stringify(metadata)}
        </div>
    );
}
