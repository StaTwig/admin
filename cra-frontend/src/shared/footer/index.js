import React from "react";

import statwigLogo from "../../assets/brands/StatwigLogo B&W.png";
import "./style.scss";

const Footer = () => {
  return (
    <footer>
      <p>Version 2.0</p>
      Made with Care
      <div className='footer-branding'>
        <img src={statwigLogo} className='' alt='statwig logo' width='80px' />
      </div>
    </footer>
  );
};

export default Footer;
