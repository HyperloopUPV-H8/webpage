import dossierPartners from '../../assets/corporative/dossier.pdf';
import style from './style.module.scss';
import PartnersDisplay from '../../components/PartnersDisplay';
import { Tier } from '../DashboardPage/PartnersEdit/store/dto';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function PartnersPage() {
    const [meta, setMeta] = useState<Tier[]>([]);

    useEffect(() => {
        fetch(
            `https://${import.meta.env.VITE_BACKEND_URL}/${
                import.meta.env.VITE_BACKEND_PARTNERS_METADATA_ENDPOINT
            }`
        ).then((response) => {
            response.json().then(setMeta);
        });
    }, []);

    const { t } = useTranslation('partners');

    return (
        <>
            <div
                className={`${style['partners__section']} ${style['section-1']}`}
            >
                <h1 className={style['partners__title']}>Partners</h1>
                <div id={style['partners__dossier']}>
                    <div className={style['partners__dossier__background']}>
                        <h2 className={style['partners__dossier__title']}>
                            {t('we-need-you')}
                        </h2>
                        <p>
                            {t('text-1')}
                        </p>
                        <p>
                            <strong>
                                {t('text-2')}
                            </strong>
                        </p>
                        <a
                            id={style['partners__dossier_button']}
                            download="HyperloopUPV-Dossier.pdf"
                            href={dossierPartners}
                        >
                            Dossier Partners
                        </a>
                    </div>
                </div>
            </div>
            <PartnersDisplay metadata={meta} />
        </>
    );
}
