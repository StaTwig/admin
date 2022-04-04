import React from "react";
import TransactionProductss from "../../components/TransactionProducts";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useTranslation } from "react-i18next";
const TransactionProducts = (props) => {
  const { t } = useTranslation();
  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='content'>
          <TransactionProductss
            inventories={props.location.state.data}
            t={t}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionProducts;
