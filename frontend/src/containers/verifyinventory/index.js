import React from "react";
import VerifyInventory from "../../components/verifyinventory";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useTranslation } from "react-i18next";

const VerifyInventoryContainer = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='content'>
          <VerifyInventory {...props} t={t} i18n={i18n} />
        </div>
      </div>
    </div>
  );
};

export default VerifyInventoryContainer;
