import React from "react";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import TransactionHistory from "../../components/transactionHistory";

const TransactionHistoryContainer = (props) => {
  return (
    <div className='container-fluid p-0'>
      <Header {...props} />
      <div className='d-flex'>
        <Sidebar {...props} />
        <div className='content'>
          <TransactionHistory {...props} />
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryContainer;
