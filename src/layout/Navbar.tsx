import { Link, useLocation } from "react-router-dom"
import NavbarLogo from "../assets/corporative/navbar-logo.svg"
import { useEffect, useRef, useState } from "react"
import Hamburger from "hamburger-react"

export const Navbar = () => {
  const [isOpen, setOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const navbar = useRef<HTMLDivElement>(null);
  const navbarLinks = useRef<HTMLUListElement>(null);
  const location = useLocation();
  
  useEffect(() => {
    setOpen(false);
    navbar.current?.classList.remove("navbar--open");
  }, [location]);

  useEffect(() => {
    let lastScroll = window.scrollY
    const handleScroll = (_: Event) => {
      if(lastScroll < 10) {
        setIsHidden(false);
      } else {
        setIsHidden(window.scrollY - lastScroll > 0)
      }
      if(window.scrollY - lastScroll > 0) {
        setOpen(false);
      }
      lastScroll = window.scrollY;
    }

    window.addEventListener("scroll", handleScroll)
    
    return () => {window.removeEventListener("scroll", handleScroll)}
  }, [])

  const setMenu = (isOpen: boolean) => {
    if(isOpen) {
      navbar.current?.classList.add("navbar--open");
      navbarLinks.current?.classList.add("navbar__links--open")
    } else {
      navbar.current?.classList.remove("navbar--open")
      navbarLinks.current?.classList.remove("navbar__links--open")
    } 
  }

  return (
    <div className={"navbar" + (isHidden ? " navbar--hidden" : "")} ref={navbar}>
      <div className="navbar__logo">
        <Link to={"/"}>
          <img src={NavbarLogo} alt="Hyperloop Logo" />
        </Link>
      </div>

      <div className="navbar__hamburger-icon">
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          onToggle={setMenu} 
          color="white"
          rounded
          hideOutline={false}
        />
      </div>

      <ul className={"navbar__links" + (isOpen ? " navbar__links--open" : "")} ref={navbarLinks}>
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
          <Link to="/partners">Partners</Link>
        </li>
        <li>
          <Link to="/contact">Contacto</Link>
        </li>
        {/* <li>
          <Link to="/">Tienda de ropa</Link>
        </li> */}
        </ul>
    </div>
  )
}
