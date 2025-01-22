import { useTranslation } from 'react-i18next';
import style from './style.module.scss';

export default function PartnersPage() {

    const { t } = useTranslation('join');

    return (
        <>
            <div
                className={`${style['partners__section']} ${style['section-1']}`}
            >
                <div id={style['partners__dossier']}>
                    <div className={style['partners__dossier__background']}>
                        <h1 className={style['partners__dossier__title']}>
                            {t('we-are-waiting-for-you')}
                        </h1>
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
                            href="https://forms.gle/CiXoQVeug2RKVx7p6"
                        >
                            {t('registration-form')}
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
