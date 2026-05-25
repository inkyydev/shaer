import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ROUTES } from '../../lib'
import './Header.css'

import logo from '../../assets/logo.svg'
import arrow from '../../assets/arrow-right.svg'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)
  const toggleMenu = () => setMenuOpen((open) => !open)

  return (
    <>
      <div className="header-banner">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        <img src={arrow} alt="arrow" />
      </div>
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <div className="header__inner--logo">
              <Link to={ROUTES.home} className="header__logo">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div
              className={`header__inner--menu${menuOpen ? ' header__inner--menu--open' : ''}`}
            >
              <div className="header__inner--menu--items">
                <NavLink to={ROUTES.home} onClick={closeMenu}>
                  Company
                </NavLink>
                <NavLink to={ROUTES.home} onClick={closeMenu}>
                  Contact
                </NavLink>
                <NavLink to={ROUTES.home} onClick={closeMenu}>
                  Blog
                </NavLink>
              </div>
              <div className="header__inner--menu--login">
                <NavLink to="#" onClick={closeMenu}>
                  Log In
                </NavLink>
                <NavLink to="#" className="btn-all" onClick={closeMenu}>
                  Book a Demo
                </NavLink>
              </div>
            </div>
            <button
              type="button"
              className={`header__inner--mobile${menuOpen ? ' header__inner--mobile--open' : ''}`}
              aria-label={menuOpen ? 'Zatvori meni' : 'Otvori meni'}
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
