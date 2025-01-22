import { useTranslation } from 'react-i18next';
import style from './style.module.scss';

interface SubsystemTitleProps {
    name: string;
}

export default function SubsystemTitle({ name }: SubsystemTitleProps) {
    const { t } = useTranslation('team');
    return (
        <div className={style['subsystem__title']}>
            <p>{t('subsystem')}</p>
            <h2>{name}</h2>
        </div>
    );
}
