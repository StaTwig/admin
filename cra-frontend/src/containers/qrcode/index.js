import React from "react";
import QrCode from "../../components/qrcode";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";

const QrCodeContainer = (props) => {
  return (
    <div className='container-fluid p-0'>
      <Header {...props} />
      <div className='d-flex'>
        <Sidebar {...props} />
        <div className='content'>
          <QrCode {...props} />
        </div>
      </div>
    </div>
  );
};

export default QrCodeContainer;
