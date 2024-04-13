import dossierPartners from '../../assets/corporative/dossier.pdf';
import style from './style.module.scss';
import PartnersDisplay from '../../components/PartnersDisplay';
import { Tier } from '../DashboardPage/PartnersEdit/store/dto';
import { useEffect, useState } from 'react';

export default function PartnersPage() {
    const [meta, setMeta] = useState<Tier[]>([]);

    useEffect(() => {
        fetch(
            `http://${import.meta.env.VITE_BACKEND_URL}/${
                import.meta.env.VITE_BACKEND_PARTNERS_METADATA_ENDPOINT
            }`
        ).then((response) => {
            response.json().then(setMeta);
        });
    }, []);

    return (
        <>
            <div
                className={`${style['partners__section']} ${style['section-1']}`}
            >
                <h1 className={style['partners__title']}>Partners</h1>
                <div id={style['partners__dossier']}>
                    <div className={style['partners__dossier__background']}>
                        <h2 className={style['partners__dossier__title']}>
                            ¡Te necesitamos!
                        </h2>
                        <p>
                            Este año, en Hyperloop UPV apostamos por una visión
                            completamente escalable, un nuevo vehículo prototipo
                            y su infraestructura. La manera de conseguirlo es
                            rodeándonos de empresas dispuestas a pertenecer a
                            este equipo, pues solo unidos lograremos dejar
                            huella en la sociedad.
                        </p>
                        <p>
                            <b>
                                Apostar por Hyperloop UPV no solo significa
                                construir juntos el transporte del futuro,
                                también presenta una serie de ventajas para el
                                presente de nuestros patrocinadores.
                            </b>
                        </p>
                        <a
                            id={style['partners__dossier_button']}
                            download
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
