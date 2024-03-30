import arrow from '../../assets/icons/arrow.svg';
import style from './style.module.scss';

type Category = 'premium' | 'gold' | 'silver';

interface Props {
    image: string;
    category: Category;
    url: string;
}

export default function MediaNew({ image, category, url }: Props) {
    return (
        <div className={style.container}>
            <div className={style.title}>
                <p>Noticias {category.toUpperCase()}</p>
            </div>

            <a href={url} target="_blank">
                <div className={`${style.image} ${style[category]}`}>
                    <img src={image} />
                </div>
            </a>

            <div className={style.footer}>
                <a href={url} target="_blank">
                    <div className={style.footer_container}>
                        <p>Leer Más</p>
                        <img src={arrow} alt="Arrow right" />
                    </div>
                </a>
            </div>
        </div>
    );
}
