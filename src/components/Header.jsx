import { Menu } from 'lucide-react'
import pageLogo from '../assets/logo.png'

const Header = () => {
  return (
    <nav className="navbar" id="navbar">
      <div className="nav-container">
        <a href="#" class="container logo">
          <img src={pageLogo.src} className="w-14 rounded-full shadow mr-6" alt="logoEmpresa" />
          <h1 className="text-blue-400">SwiftService</h1>
        </a>
        <ul className="nav-menu" id="navMenu">
          <li><a href="/">Inicio</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="/servicios">Servicios</a></li>
          <li><a href="/pinturas">Pintura</a></li>
          <li><a href="/contacto">Contacto</a></li>
          <button className="cta-button" onClick={() => {
            window.location.href = '#cotizar';
          }}>
            Cotizar ahora
          </button>
        </ul>
        <div className="menu-toggle" id="menuToggle">
          <Menu />
        </div>
      </div>
    </nav>
  );
}

export default Header;