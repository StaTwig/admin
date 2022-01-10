import React from "react";

import statwigLogo from "../../assets/brands/StatwigLogo B&W.png";
import "./style.scss";

const Footer = (props) => {
  const { t } = props;
  return (
    <footer>
      <p> {t('version')} 2.0</p>
      {t('made_with_care')}
      <div className='footer-branding'>
        <img src={statwigLogo} className='' alt='statwig logo' width='80px' />
      </div>
    </footer>
  );
};

export default Footer;
