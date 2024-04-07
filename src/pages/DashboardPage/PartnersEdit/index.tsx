import { useEffect } from 'react';
import style from './style.module.scss';
import TierEdit from './TierEdit';
import { usePartnersStore } from './store';

type Props = {
    username: string;
    password: string;
};

export default function PartnersEdit(props: Props) {
    const metadata = usePartnersStore((state) => state.metadata);
    const loadOriginalMetadata = usePartnersStore((state) => state.setMetadata);
    const resetModifiedMetadata = usePartnersStore(
        (state) => state.resetMetadata
    );
    const addTier = usePartnersStore((state) => state.addTier);

    useEffect(() => {
        fetch('http://localhost:8080/partners', {
            method: 'GET',
        }).then((response) =>
            response.json().then((body) => loadOriginalMetadata(body))
        );
    }, [props.username, props.password]);

    return (
        <>
            <div className={style.container}>
                <div className={style.state_controls}>
                    <button
                        className={style.reset}
                        onClick={resetModifiedMetadata}
                    >
                        Reset
                    </button>
                    <button className={style.save}>Save</button>
                </div>
                {metadata.map((meta, idx) => {
                    return <TierEdit key={meta.id} index={idx} />;
                })}
                <button className={style.add_tier} onClick={addTier}>
                    +
                </button>
            </div>
            <div className={style.container}>{JSON.stringify(metadata)}</div>
        </>
    );
}
