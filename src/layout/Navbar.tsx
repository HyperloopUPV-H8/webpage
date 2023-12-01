import { Link } from "react-router-dom"
import NavbarLogo from "../assets/corporative/navbar-logo.svg"

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Link to={"/"}>
          <img src={NavbarLogo} alt="Hyperloop Logo" />
        </Link>
      </div>

      <div className="navbar__links">
        <ul className="navbar__links__list">
          <li>
            <Link to="#">Acerca</Link>
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
            <Link to="#">Partners</Link>
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
