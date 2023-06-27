import { Link } from "react-router-dom";
import Logo from '../../images/logo1.png'
import Registration from './Registration'
import Login from './Login'
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'
import '../../styles/header/Navbar.css'

function Navbar(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <>
      <div className="container">
        <div className="navbar-header">
          <nav className="navbar">
            <div className="navbar-logo">
              <Link to='/' className="nav-links">
                <h1 className="logo-title">
                  <img className="logo-image"
                    src={Logo}
                    alt="Logo" />
                  My Tattoo Artist</h1>
              </Link>
            </div>
            <div >
              <button className='menu-toggle' onClick={handleMenuToggle}>
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
              <ul className={menuOpen ? "navbar-menu active" : "navbar-menu"}>
                <li className="nav-item">
                  <Link to='/' className="nav-links">Accueil</Link></li>
                <li className="nav-item">
                  <Link to='/artistes' className="nav-links">Artistes</Link></li>
                {/* <li className="nav-item">
              <Link to='/studios' className="nav-links">Studios</Link></li> */}
                <li className="nav-item">
                  <Link to='/types-de-tatouage' className="nav-links">Types de tatouage</Link></li>
              </ul>
            </div>
            <div className={menuOpen ? "navbar-connection active" : "navbar-connection"}>
              <div className="text-artist">
                <p>Je suis un artiste</p>
              </div>
              <div className="button-connect">
                <Registration />
                <Login />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navbar