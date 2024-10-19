import { Link, useLocation } from 'react-router-dom';
import NavbarLogo from '../../assets/corporative/navbar-logo.svg';
import { useEffect, useRef, useState } from 'react';
import Hamburger from 'hamburger-react';
import style from './style.module.scss';

export const Navbar = () => {
    const [isOpen, setOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const navbar = useRef<HTMLDivElement>(null);
    const navbarLinks = useRef<HTMLUListElement>(null);
    const location = useLocation();

    useEffect(() => {
        setOpen(false);
        navbar.current?.classList.remove(style.navbar_open);
    }, [location]);

    useEffect(() => {
        let lastScroll = window.scrollY;
        const handleScroll = (_: Event) => {
            if (lastScroll < 10) {
                setIsHidden(false);
            } else {
                setIsHidden(window.scrollY - lastScroll > 0);
            }
            if (window.scrollY - lastScroll > 0) {
                setOpen(false);
            }
            lastScroll = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const setMenu = (isOpen: boolean) => {
        if (isOpen) {
            navbar.current?.classList.add(style.navbar_open);
            navbarLinks.current?.classList.add(style.links_open);
        } else {
            navbar.current?.classList.remove(style.navbar_open);
            navbarLinks.current?.classList.remove(style.links_open);
        }
    };

    return (
        <div
            className={`${style.navbar} ${isHidden ? style.navbar_hidden : ''}`}
            ref={navbar}
        >
            <div className={style.logo}>
                <Link to={'/'}>
                    <img src={NavbarLogo} alt="Hyperloop Logo" />
                </Link>
            </div>

            <div className={style.hamburger}>
                <Hamburger
                    toggled={isOpen}
                    toggle={setOpen}
                    onToggle={setMenu}
                    color="white"
                    rounded
                    hideOutline={false}
                />
            </div>

            <ul
                className={`${style.links} ${isOpen ? style.links_open : ''}`}
                ref={navbarLinks}
            >
                <li>
                    <Link to="/about">Acerca</Link>
                </li>
                {/* <li>
          <Link to="/">Hyperloop</Link>
        </li> */}
                <li>
                    <Link to="/team">Equipo</Link>
                </li>
                <li>
                    <Link to="/timeline">Trayectoria</Link>
                </li>
                <li>
                    <Link to="/research">Investigación</Link>
                </li>
                <li>
                    <Link to="/partners">Partners</Link>
                </li>
                <li>
                    <Link to="/contact">Contacto</Link>
                </li>
                <li>
                    <Link to="/join">Únete</Link>
                </li>
                {/* <li>
          <Link to="/">Tienda de ropa</Link>
        </li> */}
            </ul>
        </div>
    );
};
