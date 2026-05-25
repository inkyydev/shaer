import './Footer.css'

import { Link } from 'react-router-dom'
import { ROUTES } from '../../lib'

import logo from '../../assets/logo.svg'
import linkedin from '../../assets/linkedin-icon.svg';
import instagram from '../../assets/instagram-icon.svg';
import xIcon from '../../assets/x-icon.svg';

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="footer-logo">
              <Link to={ROUTES.home}>
                <img src={logo} alt="logo" />
              </Link>
              <p>Shaer is the Ai platform that powers the home service businesses.</p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="footer-menu">
              <div className="footer-menu__items">
                <Link to={'#'}>Company</Link>
                <Link to={'#'}>Contact</Link>
                <Link to={'#'}>Blog</Link>
              </div> 
              <Link to={'#'} className="btn-all">Book a Demo</Link>
            </div>
          </div>
        </div>
        <div className="separator"></div>
        <div className="row align-items-center">
          <div className="col-12 col-md-4">
            <p className="footer__copy">Copyright {year} Shaer. All Right Reserved</p>
          </div>
          <div className="col-12 col-md-4">
            <div className="footer-social">
                <Link to={'#'} target='_blank'>
                  <img src={linkedin} alt="linkedin" />
                </Link>
                <Link to={'#'} target='_blank'>
                  <img src={instagram} alt="instagram" />
                </Link>
                <Link to={'#'} target='_blank'>
                  <img src={xIcon} alt="x" />
                </Link>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="footer-terms">
              <Link to={'#'}>Privacy Policy</Link>
              <Link to={'#'}>Copyright</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__inner">
        
      </div>
    </footer>
  )
}
