import React from "react";
import CreateShipment from "../../components/createshipment";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useTranslation } from "react-i18next";

const CreateShipmentContainer = (props) => {
  const { t } = useTranslation();
  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='content'>
          <CreateShipment {...props} t={t} />
        </div>
      </div>
    </div>
  );
};

export default CreateShipmentContainer;
