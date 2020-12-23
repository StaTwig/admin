import React from 'react'

import statwigLogo from '../../assets/brands/Statwig-Logo.png';
import './style.scss'

const Footer = () => {
  return (
    <footer>
      <p>Version 2.0</p>
      <div className="footer-branding">
        <img src={statwigLogo} alt="statwig logo" width="80px"/>
      </div>
    </footer>
  )
}

export default Footer;