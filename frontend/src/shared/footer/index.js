import React from 'react'

import statwigLogo from '../../assets/brands/Statwig-Logo.png';
import './style.scss'

const Footer = () => {
  return (
    <footer>
      <p>Version 1.2</p>
      <p>Made with care</p>
      <div className="branding">
        <img src={statwigLogo} alt="statwig logo" width="100px"/>
      </div>
    </footer>
  )
}

export default Footer;