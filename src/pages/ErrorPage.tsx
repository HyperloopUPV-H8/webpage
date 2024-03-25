import { Link } from 'react-router-dom';
import teamLogo from '../assets/corporative/navbar-logo.svg';

export const ErrorPage = () => {
    return (
        <div id="error__page">
            <img src={teamLogo} className="error__team__logo" />
            <div className="error__page__content">
                <h1>Oops!</h1>
                <p>No hemos podido encontrar ese enlace.</p>
                <Link className="error__page__link" to="/">
                    Volver a la pagina de inicio
                </Link>
            </div>
        </div>
    );
};
