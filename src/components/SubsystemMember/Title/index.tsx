import style from './style.module.scss';

interface SubsystemTitleProps {
    name: string;
}

export default function SubsystemTitle({ name }: SubsystemTitleProps) {
    return (
        <div className={style['subsystem__title']}>
            <p>Subsistema</p>
            <h2>{name}</h2>
        </div>
    );
}
