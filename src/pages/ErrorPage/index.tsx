import { Link } from 'react-router-dom';
import teamLogo from '../../assets/corporative/navbar-logo.svg';
import style from './style.module.scss';

export default function ErrorPage() {
    return (
        <div id={style['error__page']}>
            <img src={teamLogo} className={style['error__team__logo']} />
            <div className={style['error__page__content']}>
                <h1>Oops!</h1>
                <p>No hemos podido encontrar ese enlace.</p>
                <Link className={style['error__page__link']} to="/">
                    Volver a la pagina de inicio
                </Link>
            </div>
        </div>
    );
}
