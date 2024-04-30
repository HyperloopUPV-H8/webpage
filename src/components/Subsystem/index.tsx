import style from './style.module.scss';

interface SubsystemProps {
    name: string;
    image: string;
}

export default function Subsystem({ name, image }: SubsystemProps) {
    return (
        <div className={style.subsystem}>
            <div className={style.image}>
                <a href={`#${name}`}>
                    <img src={image} alt={`${name} subsystem`} />
                </a>
            </div>
            <div className={style.name}>
                <p>{name}</p>
            </div>
        </div>
    );
}
