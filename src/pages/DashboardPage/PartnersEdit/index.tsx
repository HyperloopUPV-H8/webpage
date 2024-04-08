import { useEffect } from 'react';
import style from './style.module.scss';
import TierEdit from './TierEdit';
import { usePartnersStore } from './store';
import { Partner, Tier } from './store/model';
import * as DTO from './store/dto';
import { sha256 } from 'js-sha256';

type Props = {
    username: string;
    password: string;
};

export default function PartnersEdit(props: Props) {
    const metadata = usePartnersStore((state) => state.metadata);
    const loadOriginalMetadata = usePartnersStore((state) => state.setMetadata);
    const addTier = usePartnersStore((state) => state.addTier);

    const loadMeta = () => {
        fetch(
            `http://${import.meta.env.VITE_BACKEND_URL}/${
                import.meta.env.VITE_BACKEND_PARTNERS_METADATA_ENDPOINT
            }`,
            {
                method: 'GET',
            }
        ).then((response) =>
            response.json().then((body) => loadOriginalMetadata(body))
        );
    };

    useEffect(loadMeta, [props.username, props.password]);

    const onSave = async () => {
        const main = getMainJson(metadata);
        await fetch(
            `http://${import.meta.env.VITE_BACKEND_URL}/${
                import.meta.env.VITE_BACKEND_PARTNERS_METADATA_ENDPOINT
            }`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${btoa(
                        `${props.username}:${sha256(props.password)}`
                    )}`,
                },
                body: main,
            }
        );

        metadata.forEach(async (meta) =>
            meta.partners.forEach(async (meta) => {
                if (meta.logo.method != 'image') {
                    return;
                }

                await fetch(
                    `http://${import.meta.env.VITE_BACKEND_URL}/${
                        import.meta.env.VITE_BACKEND_PARTNERS_MEDIA_ENDPOINT
                    }/${meta.name}`,
                    {
                        method: 'POST',
                        headers: {
                            Authorization: `Basic ${btoa(
                                `${props.username}:${sha256(props.password)}`
                            )}`,
                            'Content-Type': meta.logo.image
                                ? meta.logo.image.file.type
                                : 'application/octet-stream',
                        },
                        body: meta.logo.image?.file,
                    }
                );
            })
        );
    };

    return (
        <>
            <div className={style.container}>
                <div className={style.state_controls}>
                    <button className={style.reset} onClick={loadMeta}>
                        Reset
                    </button>
                    <button className={style.save} onClick={onSave}>
                        Save
                    </button>
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

function getMainJson(metadata: Tier[]): string {
    const dto: DTO.Tier[] = metadata.map((meta) => ({
        name: meta.name,
        style: meta.style,
        partners: meta.partners.map((meta) => ({
            name: meta.name,
            webpageURL: meta.webpageURL,
            logo: getLogo(meta),
        })),
    }));
    return JSON.stringify(dto);
}

function getLogo(meta: Partner): DTO.Logo {
    let url = '';
    switch (meta.logo.method) {
        case 'url':
            url = meta.logo.url ?? '';
            break;
        case 'image':
            url = `http://${import.meta.env.VITE_BACKEND_URL}/${
                import.meta.env.VITE_BACKEND_PARTNERS_MEDIA_ENDPOINT
            }/${meta.name}`;
            break;
    }
    return {
        url: url,
        width: meta.logo.width,
        height: meta.logo.height,
    };
}
