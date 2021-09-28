import React from "react";
import TransactionProductss from "../../components/TransactionProducts";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";

const TransactionProducts = (props) => {
  console.log(props.location.state);
  return (
    <div className='container-fluid p-0'>
      <Header {...props} />
      <div className='d-flex'>
        <Sidebar {...props} />
        <div className='content'>
          <TransactionProductss
            inventories={props.location.state.data}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionProducts;
