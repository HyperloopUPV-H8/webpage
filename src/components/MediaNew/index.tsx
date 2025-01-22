import { useTranslation } from 'react-i18next';
import arrow from '../../assets/icons/arrow.svg';
import style from './style.module.scss';

type Category = 'premium' | 'gold' | 'silver';

interface Props {
    image: string;
    category: Category;
    url: string;
}

export default function MediaNew({ image, category, url }: Props) {
    const { t, i18n } = useTranslation('landing');

    return (
        <div className={style.container}>
            <div className={style.title}>
                {
                    i18n.language === 'es' ? (
                        <p className={style.category}>
                            {t('news') + ' ' + category.toUpperCase()}
                        </p>
                    ) : (
                        <p className={style.category}>
                            {category.toUpperCase() + ' ' + t('news')}
                        </p>
                    )
                }
            </div>

            <a href={url} target="_blank">
                <div className={`${style.image} ${style[category]}`}>
                    <img src={image} />
                </div>
            </a>

            <div className={style.footer}>
                <a href={url} target="_blank">
                    <div className={style.footer_container}>
                        <p>{t('read-more')}</p>
                        <img src={arrow} alt="Arrow right" />
                    </div>
                </a>
            </div>
        </div>
    );
}
