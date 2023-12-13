import { Link } from "react-router-dom"
import NavbarLogo from "../assets/corporative/navbar-logo.svg"
import { useEffect, useState } from "react"

export const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    let lastScroll = window.scrollY
    const handleScroll = (_: Event) => {
      setIsHidden(window.scrollY - lastScroll > 0)
      lastScroll = window.scrollY
    }

    console.log("set")
    window.addEventListener("scroll", handleScroll)
    
    return () => {console.log("unset"); window.removeEventListener("scroll", handleScroll)}
  }, [])

  return (
    <div className={"navbar" + (isHidden ? " navbar__hidden" : "")} onScroll={() => {}}>
      <div className="navbar__logo">
        <Link to={"/"}>
          <img src={NavbarLogo} alt="Hyperloop Logo" />
        </Link>
      </div>

      <div className="navbar__links">
        <ul className="navbar__links__list">
          <li>
            <Link to="/about">Acerca</Link>
          </li>
          {/* <li>
            <Link to="/">Hyperloop</Link>
          </li> */}
          <li>
            <Link to="/team">Equipo</Link>
          </li>
          {/* <li>
            <Link to="/">Trayectoria</Link>
          </li>
          */}
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
    </div>
  )
}
