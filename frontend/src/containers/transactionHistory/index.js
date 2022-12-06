import React from "react";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import TransactionHistory from "../../components/transactionHistory";
import { useTranslation } from "react-i18next";

const TransactionHistoryContainer = (props) => {
  const { t } = useTranslation();
  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='content'>
          <TransactionHistory {...props} t={t} />
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryContainer;
