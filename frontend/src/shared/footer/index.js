import React from "react";

import statwigLogo from "../../assets/brands/StatwigLogo B&W.png";
import "./style.scss";
import { t } from "i18next";
const Footer = () => {
  return (
    <footer>
      <p>{t('Version 1.2')}</p>
      <p>{t('Made with care')}</p>
      <div className="footer-branding">
        <img src={statwigLogo} alt="statwig logo" width="80px" />
      </div>
    </footer>
  );
};

export default Footer;
