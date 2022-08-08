import React from "react";
import EnterId from "../../components/enterId";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useTranslation } from "react-i18next";

const EnterIdContainer = (props) => {
  const { t } = useTranslation();
  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='Network-content'>
          <EnterId {...props} t={t} />
        </div>
      </div>
    </div>
  );
};
export default EnterIdContainer;
