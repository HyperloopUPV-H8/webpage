import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import style from './style.module.scss';
import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import NavbarLogo from '../../assets/corporative/navbar-logo.svg';

type Tab = {
    name: string;
    content: ReactNode;
};

type Props = {
    tabs: Tab[];
    onSignOut: () => void;
    username: string;
};

export default function DashboardNavbar(props: Props) {
    const [isOpen, setOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);
    const navbar = useRef<HTMLDivElement>(null);
    const navbarLinks = useRef<HTMLUListElement>(null);

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

    const switchTab = (index: number) => {
        return function (event: MouseEvent<HTMLAnchorElement>) {
            event.preventDefault();
            setCurrentTab(index);
        };
    };

    const onDragOver = () => {
        setIsHidden(true);
    };

    return (
        <>
            <div
                className={`${style.navbar} ${
                    isHidden ? style.navbar_hidden : ''
                }`}
                ref={navbar}
                onDragOver={onDragOver}
            >
                <div className={style.logo}>
                    <Link to={'/'}>
                        <img src={NavbarLogo} alt="Hyperloop Logo" />
                    </Link>
                </div>

                <p className={style.user}>{props.username}</p>

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
                    className={`${style.links} ${
                        isOpen ? style.links_open : ''
                    }`}
                    ref={navbarLinks}
                >
                    {props.tabs.map((tab, index) => {
                        return (
                            <li key={`${tab.name}-${index}`}>
                                <a
                                    className={style.link}
                                    onClick={switchTab(index)}
                                >
                                    {tab.name}
                                </a>
                            </li>
                        );
                    })}
                    <li>
                        <a className={style.link} onClick={props.onSignOut}>
                            Sign out
                        </a>
                    </li>
                </ul>
            </div>
            <div className={style.content}>
                {props.tabs.length > 0 ? props.tabs[currentTab].content : <></>}
            </div>
        </>
    );
}
